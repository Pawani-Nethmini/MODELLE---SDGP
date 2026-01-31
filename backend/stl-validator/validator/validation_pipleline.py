from stl_validator import validate_stl
from printer_validator import validator_against_printer

def run_validation_pipeline(file_path, printer_id):

    """
    validates a 3D model STL file against 
    1. geometrical rules - stl_validator.py
    2. printer specific rules - printer_validator.py
    """
    response = {
        "success": False,
        "stl_validation": None,
        "printer_validation": None,
        "printable": False
    }
    try:
        stl_result = validate_stl(file_path)
        response["stl_validation"] = stl_result

    except ValueError as ve:
        response["stl_validation"] = {
            "success": False,
            "error": str(ve)
        }
        return response
    
    # printer validation
    printer_result  = validator_against_printer(stl_result, printer_id)
    response["printer_validation"] = printer_result
    response["printable"] = (
        stl_result["printable"] and printer_result.get("compatible", False)
    )
    response["success"] = True

    return response