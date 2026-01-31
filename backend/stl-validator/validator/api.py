# exposes stll + printer validation as an API so that
#  the Node.js backend can call it using HTTP requests

from fastapi import FastAPI, File, UploadFile, Form
import shutil
import os
import uuid

from validator.validation_pipeline import run_validation_pipeline

app = FastAPI()

# temp folder to store uploaded files
TEMP_DIR = "temp_stl_uploads"
os.makedirs(TEMP_DIR, exist_ok=True)

@app.post("/validate")
async def validate_stl(
    stl_file: UploadFile = File(...),
    printer_id: str = Form(...)
):
    """
    this recieves an STL file
    revieves a printer ID
    Runs STL + printer validation
    returns validation results as JSON    
    """

    # unique file name
    temp_filename = f"{uuid.uuid4()}_{stl_file.filename}"
    temp_filepath = os.path.join(TEMP_DIR, temp_filename)

    # save uploaded file to temp location
    with open(temp_filepath, "wb") as buffer:
        shutil.copyfileobj(stl_file.file, buffer)

    try:
        # run validation pipeline
        validation_results = run_validation_pipeline(
            file_path=temp_filepath,
            printer_id= printer_id
        )

        # return the validation result as JSON
        return {
            "success": True,
            "results": validation_results
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    finally:
        # clean up temp file
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)