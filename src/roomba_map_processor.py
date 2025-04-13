import cv2
import numpy as np
import matplotlib.pyplot as plt
import json

class RoombaMapProcessor:
    def __init__(self):
        self.green_lower = np.array([40, 40, 40])
        self.green_upper = np.array([80, 255, 255])
        
    def preprocess_image(self, image):
        # Convert to HSV for better color segmentation
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Create mask for green boundary
        green_mask = cv2.inRange(hsv, self.green_lower, self.green_upper)
        
        # Create mask for empty spaces (non-green areas inside the boundary)
        kernel = np.ones((3,3), np.uint8)
        green_mask = cv2.morphologyEx(green_mask, cv2.MORPH_CLOSE, kernel)
        
        # Find the largest green contour (store boundary)
        contours, _ = cv2.findContours(green_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            raise ValueError("No green boundary detected")
        store_contour = max(contours, key=cv2.contourArea)
        
        # Create a mask of the store interior
        store_mask = np.zeros_like(green_mask)
        cv2.drawContours(store_mask, [store_contour], -1, (255), -1)
        
        # The empty spaces are where it's not green inside the store boundary
        empty_mask = cv2.bitwise_and(cv2.bitwise_not(green_mask), store_mask)
        
        # Clean up the empty spaces mask
        empty_mask = cv2.morphologyEx(empty_mask, cv2.MORPH_OPEN, kernel)
        empty_mask = cv2.morphologyEx(empty_mask, cv2.MORPH_CLOSE, kernel)
        
        return green_mask, empty_mask
    
    def extract_vertices(self, contour, epsilon_factor=0.01):
        # Approximate the contour to get vertices
        epsilon = epsilon_factor * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)
        
        # Convert to list of tuples with native Python types
        vertices = [(int(point[0][0]), int(point[0][1])) for point in approx]
        # Close the polygon by adding first vertex at end
        if vertices[0] != vertices[-1]:
            vertices.append(vertices[0])
        
        return vertices
    
    def process_map(self, image_path):
        # Read image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")
            
        # Get masks
        green_mask, empty_mask = self.preprocess_image(image)
        
        # Find contours
        green_contours, _ = cv2.findContours(green_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        empty_contours, _ = cv2.findContours(empty_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if not green_contours:
            raise ValueError("No green boundary detected")
            
        # Get store boundary (largest green contour)
        store_contour = max(green_contours, key=cv2.contourArea)
        store_vertices = self.extract_vertices(store_contour, epsilon_factor=0.005)
        
        # Get empty space polygons
        polygons = []
        min_area = 1000  # Minimum area to consider as a significant empty space
        for contour in empty_contours:
            area = cv2.contourArea(contour)
            if area > min_area:
                vertices = self.extract_vertices(contour, epsilon_factor=0.01)
                polygons.append({"polygon_vertices": vertices})
        
        # Sort polygons by area (largest first)
        polygons.sort(key=lambda x: cv2.contourArea(np.array(x["polygon_vertices"]).reshape(-1, 1, 2)), reverse=True)
        
        # Visualize results
        plt.figure(figsize=(12, 8))
        
        # Plot original image
        img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        plt.imshow(img_rgb)
        
        # Plot store boundary in green
        store_vertices_array = np.array(store_vertices)
        plt.plot(store_vertices_array[:, 0], store_vertices_array[:, 1], 'g-', linewidth=2, label='Store Boundary')
        
        # Plot empty spaces in different colors
        colors = ['r-', 'b-']
        for idx, polygon in enumerate(polygons):
            vertices = np.array(polygon['polygon_vertices'])
            plt.plot(vertices[:, 0], vertices[:, 1], colors[idx % len(colors)], 
                    linewidth=2, label=f'Block {idx + 1}')
        
        plt.legend()
        plt.axis('off')
        plt.savefig('data/processed_map.png')
        plt.close()
        
        # Create result dictionary
        result = {
            "store_vertices": store_vertices,
            "polygons": polygons
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