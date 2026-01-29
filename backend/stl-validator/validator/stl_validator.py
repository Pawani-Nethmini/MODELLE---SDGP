import trimesh
import uuid
import os

def validate_stl(file_path):
    try:
        mesh = trimesh.load(file_path, force="mesh")
    except Exception:
        raise ValueError("Invalid or corrupted STL file")

    if mesh.is_empty:
        raise ValueError("Empty mesh")

    # Convert to binary STL (internal use only)
    binary_path = f"temp_{uuid.uuid4().hex}.stl"
    mesh.export(binary_path, file_type="stl")

    # Normalize mesh
    mesh.apply_translation(-mesh.centroid)

    extents = mesh.extents
    scale_factor = 1.0 / max(extents)
    mesh.apply_scale(scale_factor)

    errors = []

    if not mesh.is_watertight:
        errors.append("Mesh is not watertight")

    if mesh.volume <= 0:
        errors.append("Invalid volume")

    result = {
        "success": True,
        "printable": len(errors) == 0,
        "converted_to_binary": True,
        "errors": errors,
        "stats": {
            "faces": int(len(mesh.faces)),
            "vertices": int(len(mesh.vertices)),
            "volume": float(mesh.volume)
        }
    }

    os.remove(binary_path)
    return result
