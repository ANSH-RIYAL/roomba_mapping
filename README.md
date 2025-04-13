# Roomba Map Processor

A web application that processes Roomba-generated store maps to detect store boundaries and internal blocks. The application uses computer vision techniques to identify and visualize store layouts from Roomba mapping data.

## Features

- Upload Roomba map images (JPEG, JPG, PNG)
- Process maps to detect store boundaries and internal blocks
- Visualize processed maps with color-coded boundaries
- Generate and download JSON files containing vertex data
- Simple web interface for easy interaction

## Project Structure

```
roomba_mapping/
├── app.py                    # Main FastAPI application
├── src/                     # Source code directory
│   └── roomba_map_processor.py  # Map processing logic
├── static/                  # Static files
│   ├── uploads/            # Uploaded files
│   └── outputs/            # Processed files
└── templates/              # HTML templates
    └── index.html          # Single page frontend
```

## Requirements

- Python 3.7+
- OpenCV
- FastAPI
- NumPy
- Matplotlib
- Additional dependencies in requirements.txt

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/roomba_mapping.git
cd roomba_mapping
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:8000
```

3. Use the web interface to:
   - Enter Store ID and Floor ID
   - Upload a Roomba map image
   - Process the map
   - View and download results

## API Endpoints

- `GET /`: Main web interface
- `POST /process-map`: Process uploaded map images
- `GET /download/{filename}`: Download processed files

## Processing Features

- Store boundary detection
- Internal block identification
- Vertex extraction
- Color-coded visualization
- JSON output with vertex coordinates

## Development

The application uses:
- FastAPI for the backend server
- OpenCV for image processing
- Matplotlib for visualization
- Vanilla JavaScript for frontend interactions

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 