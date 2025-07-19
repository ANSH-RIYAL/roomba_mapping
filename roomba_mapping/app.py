import sys
from pathlib import Path

# Add src directory to Python path
sys.path.append(str(Path(__file__).parent / "src"))

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
import shutil
import os
from roomba_map_processor import RoombaMapProcessor

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

# Ensure directories exist
UPLOAD_DIR = Path("static/uploads")
OUTPUT_DIR = Path("static/outputs")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/process-map")
async def process_map(
    file: UploadFile = File(...),
    store_id: str = Form(...),
    floor_id: str = Form(...)
):
    # Validate file type
    allowed_types = {"image/jpeg", "image/png", "image/jpg"}
    if file.content_type not in allowed_types:
        return {"error": "Invalid file type. Only JPEG, JPG and PNG are allowed."}
    
    # Create unique filename using store_id and floor_id
    file_extension = os.path.splitext(file.filename)[1]
    base_filename = f"{store_id}_{floor_id}"
    input_path = UPLOAD_DIR / f"{base_filename}{file_extension}"
    output_path = OUTPUT_DIR / f"{base_filename}_processed.png"
    vertices_path = OUTPUT_DIR / f"{base_filename}_vertices.json"
    
    # Save uploaded file
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Process the map
        processor = RoombaMapProcessor()
        result = processor.process_map(
            str(input_path),
            str(output_path),
            str(vertices_path)
        )
        
        # Return the paths for the processed files
        return {
            "success": True,
            "processed_image": f"/static/outputs/{base_filename}_processed.png",
            "vertices_file": f"/static/outputs/{base_filename}_vertices.json"
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = OUTPUT_DIR / filename
    if not file_path.exists():
        return {"error": "File not found"}
    return FileResponse(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 