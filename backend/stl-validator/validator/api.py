# exposes stl + printer validation as an API so that
# the Node.js backend can call it using HTTP requests

import shutil
import os
import uuid
import tempfile
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

from validator.validation_pipeline import run_validation_pipeline

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# temp folder to store uploaded files
TEMP_DIR = "temp_stl_uploads"
os.makedirs(TEMP_DIR, exist_ok=True)

@app.post("/validate")
async def validate_stl(
    stl_file: UploadFile = File(...),
    printer_id: str = Form(...)
):
    """
    Receives an STL file and printer ID
    Runs STL + printer validation
    Returns validation results as JSON    
    """

    # unique file name
    temp_filename = f"{uuid.uuid4()}_{stl_file.filename}"
    temp_filepath = os.path.join(TEMP_DIR, temp_filename)

    try:
        # save uploaded file to temp location
        with open(temp_filepath, "wb") as buffer:
            shutil.copyfileobj(stl_file.file, buffer)

        # run validation pipeline
        validation_results = run_validation_pipeline(
            file_path=temp_filepath,
            printer_id=printer_id
        )

        # return the validation result as JSON
        return {
            "success": True,
            "printable": validation_results["printable"],
            "issues": validation_results["issues"],
            "details": validation_results["details"]
        }

    except ValueError as ve:
        # Handle validation-specific errors
        return {
            "success": False,
            "printable": False,
            "error": str(ve),
            "issues": [{
                "type": "error",
                "category": "validation",
                "message": str(ve)
            }]
        }
    
    except Exception as e:
        # Handle unexpected errors
        return {
            "success": False,
            "printable": False,
            "error": str(e),
            "issues": [{
                "type": "error",
                "category": "system",
                "message": f"Validation failed: {str(e)}"
            }]
        }
    
    finally:
        # ALWAYS clean up temp file, even if an error occurred
        if os.path.exists(temp_filepath):
            try:
                os.remove(temp_filepath)
            except Exception as cleanup_error:
                # Log but don't fail if cleanup fails
                print(f"Warning: Failed to delete temp file {temp_filepath}: {cleanup_error}")


# Optional: Add a cleanup endpoint to manually clear old temp files
@app.post("/cleanup")
async def cleanup_temp_files():
    """
    Manually clean up any orphaned temp files.
    Useful if the server crashes and files aren't deleted.
    """
    try:
        deleted_count = 0
        if os.path.exists(TEMP_DIR):
            for filename in os.listdir(TEMP_DIR):
                filepath = os.path.join(TEMP_DIR, filename)
                try:
                    if os.path.isfile(filepath):
                        os.remove(filepath)
                        deleted_count += 1
                except Exception as e:
                    print(f"Failed to delete {filepath}: {e}")
        
        return {
            "success": True,
            "message": f"Deleted {deleted_count} temp files"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# Optional: Add a health check endpoint
@app.get("/health")
async def health_check():
    """
    Check if the API is running and can access required resources
    """
    return {
        "status": "healthy",
        "temp_dir_exists": os.path.exists(TEMP_DIR),
        "temp_files_count": len(os.listdir(TEMP_DIR)) if os.path.exists(TEMP_DIR) else 0
    }