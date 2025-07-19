# G-eez Upload Floorplan Feature

This project includes a complete implementation of the upload floorplan feature for the G-eez application, integrating the frontend UI with the roomba mapping backend.

## 🚀 Quick Start

### Option 1: Use the Run Script (Recommended)

```bash
# Make sure you're in the project root directory
cd /Users/ashutoshverma/Documents/rhoomba

# Run the application
./run_servers.sh
```

This script will:
- ✅ Check and install dependencies automatically
- ✅ Start the FastAPI backend server (port 8000)
- ✅ Start the frontend HTTP server (port 8080)
- ✅ Display all relevant URLs
- ✅ Handle graceful shutdown with Ctrl+C

### Option 2: Manual Setup

If you prefer to run servers manually:

```bash
# Terminal 1: Start Backend
cd roomba_mapping
pip install -r requirements.txt
python app.py

# Terminal 2: Start Frontend  
cd grocer-ease-ui
python -m http.server 8080
```

## 🧪 Testing the Upload Floorplan Feature

### Run the Test Script

```bash
# Make sure servers are running first, then:
./test_upload_floorplan.py
```

The test script will verify:
- ✅ Backend server health
- ✅ Frontend server health  
- ✅ CORS configuration
- ✅ Frontend page accessibility
- ✅ Upload API endpoint functionality

### Manual Testing

1. **Open the application**: http://localhost:8080/staff%20page%20v2%20-%20login%20try.html

2. **Click "Update Floorplan"** in the sidebar navigation

3. **Fill in the form**:
   - Store ID: `test_store`
   - Floor ID: `test_floor`
   - Upload an image file (JPEG, JPG, or PNG)

4. **Click "Upload & Process Floorplan"**

5. **Check results**: You should see links to the processed image and vertices data

## 📁 Project Structure

```
rhoomba/
├── run_servers.sh              # Main run script
├── test_upload_floorplan.py    # Test script
├── README.md                   # This file
├── roomba_mapping/             # Backend API
│   ├── app.py                  # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── src/
│   │   └── roomba_map_processor.py
│   ├── static/
│   │   ├── uploads/           # Uploaded files
│   │   └── outputs/           # Processed files
│   └── templates/
│       └── index.html
└── grocer-ease-ui/            # Frontend UI
    ├── staff page v2 - login try.html  # Main staff page
    ├── launch page v5.html
    ├── checkout page .html
    └── interactive floorplan.html
```

## 🔧 Features Implemented

### Frontend (Staff Page)
- ✅ **Modal Interface**: Clean, modern upload modal
- ✅ **File Preview**: Image preview before upload
- ✅ **Progress Tracking**: Visual progress bar and status messages
- ✅ **Form Validation**: Required fields and file type validation
- ✅ **Results Display**: Links to processed files
- ✅ **Error Handling**: User-friendly error messages

### Backend (FastAPI)
- ✅ **CORS Support**: Cross-origin requests enabled
- ✅ **File Upload**: Multipart form data handling
- ✅ **Image Processing**: Integration with RoombaMapProcessor
- ✅ **File Storage**: Organized upload/output directories
- ✅ **API Responses**: JSON responses with success/error status

### Integration
- ✅ **Real-time Communication**: Frontend ↔ Backend API calls
- ✅ **File Processing**: Complete image processing pipeline
- ✅ **Data Flow**: Store ID → Floor ID → Processed Files

## 🌐 URLs

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **Staff Page**: http://localhost:8080/staff%20page%20v2%20-%20login%20try.html
- **API Docs**: http://localhost:8000/docs (FastAPI auto-generated)

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill processes on ports 8000 and 8080
   lsof -ti:8000 | xargs kill -9
   lsof -ti:8080 | xargs kill -9
   ```

2. **Missing dependencies**:
   ```bash
   cd roomba_mapping
   pip install -r requirements.txt
   ```

3. **CORS errors**: Make sure both servers are running and CORS is configured in `app.py`

4. **File upload fails**: Check that the `static/uploads` and `static/outputs` directories exist

### Debug Mode

To run with more verbose output:

```bash
# Backend with debug
cd roomba_mapping
uvicorn app:app --reload --host 0.0.0.0 --port 8000 --log-level debug

# Frontend with debug
cd grocer-ease-ui  
python -m http.server 8080 --bind 0.0.0.0
```

## 📝 API Endpoints

### POST /process-map
Upload and process a floorplan image.

**Request**:
- `file`: Image file (JPEG, JPG, PNG)
- `store_id`: Store identifier
- `floor_id`: Floor identifier

**Response**:
```json
{
  "success": true,
  "processed_image": "/static/outputs/store1_floor1_processed.png",
  "vertices_file": "/static/outputs/store1_floor1_vertices.json"
}
```

## 🎯 Next Steps

Potential enhancements:
- [ ] Add authentication to the upload feature
- [ ] Implement file size limits and validation
- [ ] Add support for more image formats
- [ ] Create a file management interface
- [ ] Add batch upload capabilities
- [ ] Implement real-time processing status updates

---

**Happy coding! 🚀** 