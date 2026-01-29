import trimesh
import uuid
import os
import numpy as np

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



    # Vishmi's part starts here

    # 1. Watertight check. this check if the model is not fully closed. 
    if not mesh.is_watertight:
        errors.append("Mesh is not watertight (contains holes or open edges)")

    # 2. Hole detection (boundary edges). this checks the mesh has edges that belong to only one face.
    #    this indicates visible holes or gaps in the model. such models may cause slid=cing or printing failures.
    boundary_edges = mesh.edges_boundary
    if len(boundary_edges) > 0:
        errors.append(f"Mesh has {len(boundary_edges)} open boundary edges (holes detected)")

    # 3. Non-manifold edges. this check is some edges are shared by more than two faces.
    #    Non-manifold geometry confuses slicers and is invalid for printing.
    #    Common in badly designed or merged models.
    non_manifold_edges = mesh.edges_nonmanifold
    if len(non_manifold_edges) > 0:
        errors.append(f"Mesh has {len(non_manifold_edges)} non-manifold edges")

    # 4. Inconsistent winding. this check is some faces are oriented in the wrong direction.
    #    This causes flipped normals and incorrect inside/outside detection.
    #    Can result in inverted prints or missing geometry.
    if not mesh.is_winding_consistent:
        errors.append("Mesh has inconsistent face winding (normals may be flipped)")

    # 5. Degenerate (zero-area) faces. this check is some triangles have zero or near-zero area.
    #    These faces do not represent real geometry.
    #    They often appear due to modelling errors or precision issues.
    face_areas = mesh.area_faces
    degenerate_faces = np.sum(face_areas <= 1e-12)
    if degenerate_faces > 0:
        errors.append(f"Mesh contains {degenerate_faces} degenerate (zero-area) faces")

    # 6. Volume validity. this checj is the mesh does not enclose a valid 3D volume.
    #    A printable model must have a positive volume.
    #    Zero or negative volume indicates a broken or open model.
    if mesh.volume <= 0:
        errors.append("Mesh volume is invalid or zero")


    # vishmi's part ends here

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
