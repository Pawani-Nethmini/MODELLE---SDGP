import trimesh
import uuid
import os
import numpy as np

def bbox_thin_wall_heuristic(mesh: trimesh.Trimesh, dims: dict) -> bool:
    bbox_volume = dims["x"] * dims["y"] * dims["z"]
    if bbox_volume == 0:
        return False
    fill_ratio = mesh.volume / bbox_volume
    return fill_ratio < 0.20

def ray_cast_min_wall_thickness(
        mesh: trimesh.Trimesh, 
        num_rays=800, 
        max_distance=50.0,
        ) -> float| None:
    
    if len(mesh.faces) ==0:
        return None

    rng = np.random.default_rng(42)
    face_count = len(mesh.faces)
    sample_idx = rng.choice(face_count, size=min(num_rays, face_count), replace = False)

    centroids = mesh.triangles_center[sample_idx]
    normals = mesh.face_normals[sample_idx]
    inward = -normals

    origins = centroids + inward *1e-4

    thicknesses = []

    try:
        locations, index_ray, _ = mesh.ray.intersects_location(
            ray_origins = origins, 
            ray_directions = inward, 
            multiple_hits = True,
        )
    except Exception:
        return None
    
    if len(locations) == 0:
        return None

    ray_hits = {}
    for loc, ray_idx in zip(locations, index_ray):
        dist = np.linalg.norm(loc - origins[ray_idx])
        if 0< dist <= max_distance:
            if ray_idx not in ray_hits or dist < ray_hits[ray_idx]:
                ray_hits[ray_idx] = dist 

    thicknesses = list(ray_hits.values())
    return float(np.min(thicknesses)) if thicknesses else None


def validate_stl(file_path: str) -> dict:
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
    original_max_extent = float(max(extents))
    dimensions = {
        "x": float(mesh.extents[0]),
        "y": float(mesh.extents[1]),
        "z": float(mesh.extents[2])
    }


    scale_factor = 1.0 / max(extents)
    mesh.apply_scale(scale_factor)

    errors = []



    # Vishmi's part starts here
    # 1. Watertight check
    if not mesh.is_watertight:
        errors.append("Mesh is not watertight (contains holes or open edges)")

    # 2. Hole detection (boundary edges)
    try:
        boundary_edges = mesh.edges[trimesh.grouping.group_rows(mesh.edges_sorted, require_count=1)]
        if len(boundary_edges) > 0:
            errors.append(f"Mesh has {len(boundary_edges)} open boundary edges (holes detected)")
    except Exception:
        # Fallback if boundary edge detection fails
        pass

    # 3. Non-manifold edges
    non_manifold_edges = mesh.edges[trimesh.grouping.group_rows(mesh.edges_sorted, require_count=3)]
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

    min_wall_thickness = None
    wall_thickness_reliable = True

    bbox_suspects_thin = bbox_thin_wall_heuristic(mesh, dimensions)
    if bbox_suspects_thin:
        wall_thickness_reliable = False

        if bbox_suspects_thin:
            wall_thickness_reliable = False
            ray_result = ray_cast_min_wall_thickness(mesh)
            if ray_result is not None:
                min_wall_thickness = ray_result*original_max_extent
                wall_thickness_reliable = True

    bbox_suspects_thin = bbox_thin_wall_heuristic(mesh, dimensions)

    os.remove(binary_path)

    result = {
        "success": True,
        "printable": len(errors) == 0,
        "converted_to_binary": True,
        "errors": errors,
        "dimensions": dimensions,
        "stats": {
            "faces": int(len(mesh.faces)),
            "vertices": int(len(mesh.vertices)),
            "volume": float(mesh.volume),
            "minWallThickness": min_wall_thickness,
            "wallThicknessReliable": wall_thickness_reliable,
        }
    }
    return result
