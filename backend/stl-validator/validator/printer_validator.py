import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'printer_validator_data.json')

def load_printer_validator_data():
    with open(DATA_PATH, 'r') as file:
        data = json.load(file)
    return data["printerProfiles"]  # your JSON has "printerProfiles" key

def compute_score(issues: list) -> int:
    deductions = sum(40 if i["type"] == "error" else 10 for i in issues)
    return max(0,100 - deductions)

def validator_single(stl_data: dict, printer: dict) -> dict:
    issues =[]
    dims = stl_data["dimensions"]
    stats = stl_data["stats"]

    bv = printer["maxBuildVolume"]

    if dims["x"] > bv["x"] or dims["y"] > bv["y"] or dims["z"] > bv["z"]:
        issues.append({
            "type": "error",
            "message": (
                f"Model dimensions ({dims['x']:.1f} x {dims['y']:.1f} x {dims['z']:.1f}) mm)"
                f" exceed printer build volume ({bv['x']:.1f} x {bv['y']:.1f} x {bv['z']:.1f}) mm"
            ),
        })

    triangle_limit = printer.get("triangleCountLimit")
    face_count = stats["faces"]
    if triangle_limit and face_count > triangle_limit:
        issues.append({
            "type": "warning",
            "message": (
                f"High triangle count({face_count:,} faces, limit{triangle_limit:,}). "
                f"Model may slice slowly or cause performance issues."
            ),
        })

    min_feature = printer.get("minFeatureSize")
    if min_feature:
        min_size = min_feature["min"]
        volume = stats["volume"]

        if triangle_limit and face_count > triangle_limit * 0.5 and volume < (min_size**3):
            issues.append({
                "type": "warning",
                "message": (
                    f"Model may contain features smaller than {min_size} mm"
                    f"(min feature size for {printer['id']}). "
                    f"Fine details may not print correctly."
                ),
            })

    min_xy = min(dims["x"], dims["y"])
    if min_xy > 0 and dims["z"] / min_xy > 10:  
        issues.append({
            "type": "warning",
            "message": (
                f"Very high aspect ratio (height/min_width = "
                f"{dims['z'] / min_xy:.1f})."
                "Tall, thin features may fail or warp during printing."
            ),
        })

    if printer["technology"] == "SLA":
        bounding_box_volume = dims["x"] * dims["y"] * dims["z"]
        if bounding_box_volume > 0:
            fill_ratio = stats["volume"] / bounding_box_volume
            if fill_ratio < 0.15:
                issues.append({
                    "type": "warning",
                    "message": (
                        "Model appears largely hollow "
                        f"(fill ratio \u2248 {fill_ratio:.0%}). "
                        "Trapped resin may cause print failures; consider adding drain holes. "
                    ),
                })

    score = compute_score(issues)
    return {
        "printer_id": printer["id"],
        "technology": printer["technology"],
        "class": printer["class"],
        "score": score,
        "compatible": len(issues) ==0,
        "issues": issues,
    }
    
def validator_against_printer(stl_data: dict, printer_id: str) -> dict:
    profiles = load_printer_validator_data()
    printer  = next((p for p in profiles if p["id"] == printer_id), None)
    if printer is None:
        raise ValueError(f"Printer profile '{printer_id}' not found")

    result = validator_single(stl_data, printer)
    return {
        "success":    True,
        "printer_id": result["printer_id"],
        "compatible": result["compatible"],
        "score":      result["score"],
        "issues":     result["issues"],
    }

def validate_against_all_printers(stl_data: dict) -> dict:

    profiles = load_printer_validator_data()
    results = sorted(
        (validator_single(stl_data, printer) for printer in profiles),
        key=lambda r: (r["score"], len(r["issues"])),

    )
    compatible = [r["printer_id"] for r in results if r["compatible"]]

    return {
        "success": True,
        "results": results,
        "best": results[0] if results else None,
        "compatible": compatible
    }
        

    