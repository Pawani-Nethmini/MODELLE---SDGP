# from validator.stl_validator import validate_stl
# from validator.printer_validator import validator_against_printer

# def run_validation_pipeline(file_path, printer_id):

#     """
#     validates a 3D model STL file against 
#     1. geometrical rules - stl_validator.py
#     2. printer specific rules - printer_validator.py
#     """
#     response = {
#         "success": False,
#         "stl_validation": None,
#         "printer_validation": None,
#         "printable": False
#     }
#     try:
#         stl_result = validate_stl(file_path)
#         response["stl_validation"] = stl_result

#     except ValueError as ve:
#         response["stl_validation"] = {
#             "success": False,
#             "error": str(ve)
#         }
#         return response
    
#     # printer validation
#     printer_result  = validator_against_printer(stl_result, printer_id)
#     response["printer_validation"] = printer_result
#     response["printable"] = (
#         stl_result["printable"] and printer_result.get("compatible", False)
#     )
#     response["success"] = True

#     return response

from validator.stl_validator import validate_stl
from validator.printer_validator import validator_against_printer

def run_validation_pipeline(file_path, printer_id):
    # 1. STL-level validation
    stl_result = validate_stl(file_path)

    # If STL itself is invalid, stop early
    if not stl_result["printable"]:
        return {
            "success": False,
            "stage": "stl_validation",
            "result": stl_result
        }

    # 2. Printer-specific validation
    printer_result = validator_against_printer(stl_result, printer_id)

    return {
        "success": True,
        "stage": "complete",
        "stl_validation": stl_result,
        "printer_validation": printer_result
    }
