from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json
import os
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
        items = [i for i in items if i["material"] == material]
    if print_type:
        items = [i for i in items if i["print_type"] == print_type]
    if color:
        items = [i for i in items if i["color"] == color]
    if category:
        items = [i for i in items if i["category"] == category]

    return items
