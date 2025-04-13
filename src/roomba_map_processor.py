import cv2
import numpy as np
import matplotlib.pyplot as plt
import json

class RoombaMapProcessor:
    def __init__(self):
        self.kernel = np.ones((3,3), np.uint8)
        
    def preprocess_image(self, image):
        """
        Preprocess image to handle different formats and qualities
        """
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply bilateral filter to reduce noise while preserving edges
        filtered = cv2.bilateralFilter(gray, 9, 75, 75)
        
        # Apply adaptive thresholding
        binary = cv2.adaptiveThreshold(filtered, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                     cv2.THRESH_BINARY_INV, 11, 2)
        
        # Remove small noise
        binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, self.kernel)
        
        # Find the largest contour - this should be the floor plan boundary
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            raise ValueError("Could not detect floor plan boundary")
            
        # Get the largest contour
        main_contour = max(contours, key=cv2.contourArea)
        
        # Create a mask for the main boundary
        store_mask = np.zeros_like(gray)
        cv2.drawContours(store_mask, [main_contour], -1, (255), -1)
        
        # Create a mask for internal spaces
        # First create a binary image with white spaces
        _, binary_inv = cv2.threshold(filtered, 240, 255, cv2.THRESH_BINARY)
        
        # Remove small noise and close gaps
        binary_inv = cv2.morphologyEx(binary_inv, cv2.MORPH_CLOSE, self.kernel)
        binary_inv = cv2.morphologyEx(binary_inv, cv2.MORPH_OPEN, self.kernel)
        
        # Only keep white spaces within the store boundary
        internal_mask = cv2.bitwise_and(binary_inv, store_mask)
        
        return store_mask, internal_mask, gray

    def find_corners(self, contour):
        """
        Find corner points using contour approximation
        """
        perimeter = cv2.arcLength(contour, True)
        epsilon = 0.001 * perimeter
        approx = cv2.approxPolyDP(contour, epsilon, True)
        return [tuple(map(int, point[0])) for point in approx]

    def process_map(self, image_path):
        """
        Process the floor plan image and extract vertices
        """
        # Read image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")
        
        # Ensure consistent image size
        max_size = 1024
        height, width = image.shape[:2]
        if max(height, width) > max_size:
            scale = max_size / max(height, width)
            image = cv2.resize(image, None, fx=scale, fy=scale)
            
        # Get masks
        store_mask, internal_mask, gray_img = self.preprocess_image(image)
        
        # Find store boundary
        store_contours, _ = cv2.findContours(store_mask, cv2.RETR_EXTERNAL, 
                                           cv2.CHAIN_APPROX_SIMPLE)
        store_contour = max(store_contours, key=cv2.contourArea)
        
        # Get store vertices
        store_vertices = self.find_corners(store_contour)
        
        # Find internal spaces
        internal_contours, _ = cv2.findContours(internal_mask, cv2.RETR_EXTERNAL, 
                                              cv2.CHAIN_APPROX_SIMPLE)
        
        # Process internal spaces
        polygons = []
        min_area = image.shape[0] * image.shape[1] * 0.01  # Minimum area threshold
        for contour in internal_contours:
            area = cv2.contourArea(contour)
            if area > min_area:
                vertices = self.find_corners(contour)
                if vertices:
                    polygons.append({"polygon_vertices": vertices})
        
        # Sort polygons by area (largest first)
        polygons.sort(key=lambda x: cv2.contourArea(np.array(x["polygon_vertices"])), reverse=True)
        
        # Visualize results
        plt.figure(figsize=(12, 8))
        
        # Plot grayscale image
        plt.imshow(gray_img, cmap='gray')
        
        # Plot store boundary in green
        store_vertices_array = np.array(store_vertices)
        plt.plot(np.append(store_vertices_array[:, 0], store_vertices_array[0, 0]),
                np.append(store_vertices_array[:, 1], store_vertices_array[0, 1]),
                'g-', linewidth=2, label='Store Boundary')
        
        # Plot internal spaces in different colors
        colors = ['r-', 'b-']
        for idx, polygon in enumerate(polygons[:2]):  # Only plot first two spaces
            vertices = np.array(polygon["polygon_vertices"])
            color = colors[idx % len(colors)]
            plt.plot(np.append(vertices[:, 0], vertices[0, 0]),
                    np.append(vertices[:, 1], vertices[0, 1]),
                    color, linewidth=2, label=f'Block {idx + 1}')
        
        plt.legend()
        plt.axis('off')
        plt.savefig('data/processed_map.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # Create result dictionary
        result = {
            "store_vertices": store_vertices,
            "polygons": polygons[:2]  # Only include first two spaces
        }
        
        # Save vertices to JSON
        with open('data/vertices.json', 'w') as f:
            json.dump(result, f, indent=2)
        
        return result

def main():
    processor = RoombaMapProcessor()
    try:
        result = processor.process_map("data/roomba_map.jpeg")
        print("Processing completed successfully!")
        print("\nExtracted vertices saved to data/vertices.json")
        print("Visualization saved to data/processed_map.png")
    except Exception as e:
        print(f"Error processing map: {str(e)}")

if __name__ == "__main__":
    main() 