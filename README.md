# Roomba Map Processor

This project processes Roomba-generated map screenshots to extract and visualize polygon vertices.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Place your Roomba map image in the `data` directory as `roomba_map.jpeg`
2. Run the processor:
```bash
python src/roomba_map_processor.py
```

## Output

The script generates two files in the `data` directory:
- `vertices.json`: Contains extracted vertices for the store boundary and internal blocks
- `processed_map.png`: Visualization of the detected boundaries (green for store boundary, red and blue for internal blocks)

## Structure
```
roomba_mapping/
├── data/
│   ├── roomba_map.jpeg
│   ├── processed_map.png (generated)
│   └── vertices.json (generated)
├── src/
│   └── roomba_map_processor.py
├── requirements.txt
└── README.md
``` 