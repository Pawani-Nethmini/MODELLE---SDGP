from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import numpy as np
import trimesh

app = FastAPI(title="Modelle STL Validation Service")

# Allow frontend to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MINOR_ISSUE_TYPES = {
    "duplicate_faces",
    "duplicate_vertices",
    "degenerate_faces",
    "inconsistent_normals",
    "non_watertight_small",
}

def load_mesh_from_upload(file_bytes: bytes) -> trimesh.Trimesh:
    try:
        mesh = trimesh.load_mesh(file_obj=file_bytes, file_type="stl")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid STL file: {e}")

    if mesh is None:
        raise HTTPException(status_code=400, detail="Could not parse STL mesh.")

    # Sometimes trimesh returns a Scene
    if isinstance(mesh, trimesh.Scene):
        geoms = list(mesh.geometry.values())
        if not geoms:
            raise HTTPException(status_code=400, detail="STL contains no geometry.")
        mesh = trimesh.util.concatenate(geoms)

    if not isinstance(mesh, trimesh.Trimesh):
        raise HTTPException(status_code=400, detail="Unsupported STL structure.")

    return mesh

def validate_mesh(mesh: trimesh.Trimesh):
    issues = []

    # Duplicates
    dup_faces = int(len(mesh.faces) - len(np.unique(mesh.faces, axis=0)))
    if dup_faces > 0:
        issues.append({"type": "duplicate_faces", "severity": "minor", "message": f"Duplicate faces detected: {dup_faces}"})

    # Duplicate vertices check (rough)
    if mesh.vertices is not None and len(mesh.vertices) > 0:
        rounded = np.round(mesh.vertices, 6)
        dup_verts = int(len(rounded) - len(np.unique(rounded, axis=0)))
        if dup_verts > 0:
            issues.append({"type": "duplicate_vertices", "severity": "minor", "message": f"Duplicate vertices detected: {dup_verts}"})

    # Degenerate faces (zero area)
    try:
        face_areas = mesh.area_faces
        deg = int(np.sum(face_areas <= 1e-12))
        if deg > 0:
            issues.append({"type": "degenerate_faces", "severity": "minor", "message": f"Degenerate faces detected: {deg}"})
    except Exception:
        pass

    # Watertight / holes
    if not mesh.is_watertight:
        # If holes are small, we consider it potentially minor-fixable 
        boundary_edges = mesh.edges_boundary
        boundary_count = int(len(boundary_edges)) if boundary_edges is not None else 0
        severity = "minor" if boundary_count < 3000 else "major"
        issues.append({
            "type": "non_watertight_small" if severity == "minor" else "non_watertight_major",
            "severity": severity,
            "message": f"Mesh is not watertight. Boundary edges: {boundary_count}"
        })

    try:
        if not mesh.is_winding_consistent:
            issues.append({"type": "inconsistent_normals", "severity": "minor", "message": "Face winding/normals are inconsistent."})
    except Exception:
        pass

    # Decide fixability
    fixable_minor = all(i["type"] in MINOR_ISSUE_TYPES and i["severity"] == "minor" for i in issues) if issues else False

    summary = "Printable / No issues detected" if not issues else f"{len(issues)} issue(s) detected"
    return {"summary": summary, "issues": issues, "fixableMinor": fixable_minor}

def autofix_minor(mesh: trimesh.Trimesh) -> trimesh.Trimesh:
    mesh = mesh.copy()

    # Remove duplicates
    try:
        mesh.remove_duplicate_faces()
    except Exception:
        pass

    try:
        mesh.remove_degenerate_faces()
    except Exception:
        pass

    try:
        mesh.merge_vertices()
    except Exception:
        pass

    # Fix winding where possible
    try:
        mesh.rezero()
    except Exception:
        pass

    try:
        mesh.fix_normals()
    except Exception:
        pass

    # Attempt hole fill (only works for some cases)
    try:
        trimesh.repair.fill_holes(mesh)
    except Exception:
        pass

    # Final cleanup
    try:
        mesh.remove_unreferenced_vertices()
    except Exception:
        pass

    return mesh

@app.post("/validate")
async def validate(file: UploadFile = File(...), printerProfile: str = ""):
    if not file.filename.lower().endswith(".stl"):
        raise HTTPException(status_code=400, detail="Only .stl files are supported.")

    data = await file.read()
    mesh = load_mesh_from_upload(data)

    report = validate_mesh(mesh)

    # can also include printerProfile in response if needed
    report["printerProfile"] = printerProfile
    report["fileName"] = file.filename
    return JSONResponse(report)

@app.post("/autofix")
async def autofix(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".stl"):
        raise HTTPException(status_code=400, detail="Only .stl files are supported.")

    data = await file.read()
    mesh = load_mesh_from_upload(data)

    # Only attempt autofix if validation says it’s minor-fixable
    report = validate_mesh(mesh)
    if not report.get("fixableMinor", False):
        raise HTTPException(
            status_code=400,
            detail="Auto-fix is only allowed for minor fixable issues. Use Find a Designer for major issues."
        )

    fixed = autofix_minor(mesh)

    # Export as STL bytes
    fixed_bytes = trimesh.exchange.stl.export_stl(fixed)

    filename = file.filename.replace(".stl", "_fixed.stl")
    return Response(
        content=fixed_bytes,
        media_type="application/octet-stream",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )

@app.get("/health")
def health():
    return {"status": "ok"}