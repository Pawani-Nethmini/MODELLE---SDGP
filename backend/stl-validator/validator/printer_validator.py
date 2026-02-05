import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'printer_validator_data.json')

def load_printer_validator_data():
    with open(DATA_PATH, 'r') as file:
        data = json.load(file)
    return data["printerProfiles"]  # your JSON has "printerProfiles" key

def validator_against_printer(stl_data, printer_id):

    profiles = load_printer_validator_data()

    # find printer profile from the JSON
    printer = next(
        (p for p in profiles if p["id"] == printer_id), None
    )

    if printer is None:
        raise ValueError(f"Printer profile '{printer_id}' not found")
    
    issues = []

    print("Selected printer profile:", printer["id"])

    # 1. Checking build volume
    build_volume = printer["maxBuildVolume"]
    model_dimensions = stl_data["dimensions"]

    if (model_dimensions["x"] > build_volume["x"] or
        model_dimensions["y"] > build_volume["y"] or
        model_dimensions["z"] > build_volume["z"]):
        issues.append({
            "type": "error",
            "message": "Model exceeds printer build volume"
        })

    # 2. Triangle count check
    triangle_limit = printer.get("triangleCountLimit")
    model_triangles = stl_data["stats"]["faces"]

    if triangle_limit and model_triangles > triangle_limit:
        issues.append({
            "type": "warning",
            "message": f"High triangle count ({model_triangles}). "
                       "Model may slice slowly or cause performance issues."
        })

    # 3. Overhang angle check
    max_overhang = printer.get("maxOverhangAngle")
    if max_overhang:
        angle_value = max_overhang["value"]
        if stl_data["stats"].get("maxOverhangAngle", 0) > angle_value:
            issues.append({
                "type": "warning",
                "message": f"Model has overhangs exceeding {angle_value} degrees. "
                           "May require supports for successful printing."
            })

    # 4. Minimum feature size check (heuristic)
    min_feature_size = printer.get("minFeatureSize")
    if min_feature_size:
        min_size_value = min_feature_size["min"]
        face_count = stl_data["stats"]["faces"]
        volume = stl_data["stats"]["volume"]

        if triangle_limit and face_count > triangle_limit * 0.5 and volume < (min_size_value**3):
            issues.append({
                "type": "warning",
                "message": f"Model may have features smaller than {min_size_value}mm. "
                           "These may not print correctly."
            })

    # 5. Minimum wall thickness check
    min_wall = printer.get("minWallThickness")
    if min_wall:
        min_wall_value = min_wall["value"]
        model_min_wall = stl_data["stats"].get("minWallThickness")
        if model_min_wall and model_min_wall < min_wall_value:
            issues.append({
                "type": "error",
                "message": f"Wall thickness ({model_min_wall}mm) is below minimum ({min_wall_value}mm)."
            })

    # 6. Aspect ratio check (thin/tall features)
    dims = stl_data["dimensions"]
    min_xy = min(dims["x"], dims["y"])
    if min_xy > 0 and dims["z"] / min_xy > 10:  # arbitrary threshold
        issues.append({
            "type": "warning",
            "message": "Model has very high aspect ratio. Tall thin features may fail during printing."
        })

    # 7. Technology-specific checks
    if printer["technology"] == "SLA":
        if stl_data["stats"].get("internalVoids", False):
            issues.append({
                "type": "warning",
                "message": "Model may trap resin. Drain holes recommended for SLA printing."
            })

    return {
        "success": True,
        "issues": issues,
        "compatible":len(issues) == 0,
        "printer_id": printer["id"]
    }
    