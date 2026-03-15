from fastapi import FastAPI, Query, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import uuid
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# serve static showroom assets at /static
app.mount("/static", StaticFiles(directory="static"), name="static")

DATA_FILE = os.path.join("data", "showroom_items.json")

def load_items():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

@app.get("/showroom")
def get_showroom_items(
    material: str | None = Query(None),
    print_type: str | None = Query(None),
    color: str | None = Query(None),
    category: str | None = Query(None),
):
    items = load_items()

    if material:
        items = [i for i in items if i["material"].lower() == material.lower()]
    if print_type:
        items = [i for i in items if i["print_type"].lower() == print_type.lower()]
    if color:
        items = [i for i in items if i["color"].lower() == color.lower()]
    if category:
        items = [i for i in items if i["category"].lower() == category.lower()]

    return items

def save_items(items):
    with open(DATA_FILE, "w") as f:
        json.dump(items, f, indent=2)

@app.post("/showroom/upload")
async def upload_showroom_item(
    image: UploadFile = File(...),
    printer_type: str = Form(...),
    printing_material: str = Form(...),
    image_type: str = Form(...),
    title: str = Form(...),
    color: str = Form(...),
    price: float = Form(...),
    printer_id: str = Form(...)
):
    # Validate file type
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg'}
    file_extension = os.path.splitext(image.filename)[1].lower()
    
    if not image.content_type.startswith("image/") or file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only image files (jpg, jpeg, png, gif, webp, bmp, tiff, svg) are allowed")

    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    image_path = os.path.join("static", "showroom", unique_filename)

    # Ensure directory exists
    os.makedirs(os.path.dirname(image_path), exist_ok=True)

    # Save image
    with open(image_path, "wb") as f:
        content = await image.read()
        f.write(content)

    # Load existing items
    items = load_items()

    # Create new item
    new_item = {
        "id": f"item_{uuid.uuid4().hex[:8]}",
        "title": title,
        "image_url": f"http://127.0.0.1:8002/static/showroom/{unique_filename}",
        "material": printing_material,
        "print_type": printer_type,
        "color": color,
        "price": price,
        "category": image_type,
        "printer_id": printer_id
    }

    # Add to items
    items.append(new_item)

    # Save back to file
    save_items(items)

    return {"message": "Item uploaded successfully", "item": new_item}
