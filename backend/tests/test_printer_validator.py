import sys
import os
from pprint import pprint
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "stl-validator"))
)
from validator.printer_validator import validate_against_all_printers
print (sys.path)


def test_basic_validation():

    stl_data = {
        "dimensions": {"x": 350, "y": 300, "z": 320}, 
        "stats": {
            "faces": 1500000,   
            "volume": 2000000
        }
    }


    result = validate_against_all_printers(stl_data)
    pprint(result)
    assert result["success"] == True
    assert len(result["results"]) > 0