import pytest
import trimesh
import os
import sys

sys.path.append(os.path.abspath("stl-validator"))
from validator.stl_validator import validate_stl


TOLERANCE = 0.1

@pytest.mark.parametrize(
    "file,expected_thickness",
    [
        ("tests/models/cube_wall_0.2.stl", 0.2),
        ("tests/models/cube_wall_0.4.stl", 0.4),
        ("tests/models/cube_wall_1.0.stl", 1.0),
    ],
    
)

def test_wall_thickness(file, expected_thickness):
    result = validate_stl(file)

    detected_thickness = result["stats"]["minWallThickness"]

    print(f"\nModel: {file}")
    print(f"Expected thickness: {expected_thickness} mm")
    print(f"Detected thickness: {detected_thickness} mm")

    assert abs(detected_thickness - expected_thickness) < TOLERANCE

    