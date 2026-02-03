from validator.stl_validator import validate_stl
from validator.printer_validator import validator_against_printer

def run_validation_pipeline(file_path, printer_id):
    # 1. STL-level validation
    stl_result = validate_stl(file_path)
    
    # Collect all issues
    all_issues = []
    
    # Add STL validation errors
    for error in stl_result.get("errors", []):
        all_issues.append({
            "type": "error",
            "category": "stl_geometry",
            "message": error
        })
    
    # Determine if we should continue to printer validation
    is_printable = stl_result["printable"]
    
    # 2. Printer-specific validation (only if STL is valid)
    printer_issues = []
    compatible_with_printer = False
    
    if is_printable:
        printer_result = validator_against_printer(stl_result, printer_id)
        printer_issues = printer_result.get("issues", [])
        compatible_with_printer = printer_result.get("compatible", False)
        
        # Add printer validation issues
        for issue in printer_issues:
            all_issues.append({
                "type": issue["type"],
                "category": "printer_compatibility",
                "message": issue["message"]
            })
    
    # Final determination
    final_printable = is_printable and compatible_with_printer
    
    return {
        "printable": final_printable,
        "issues": all_issues,
        "details": {
            "stl_valid": stl_result["printable"],
            "printer_compatible": compatible_with_printer if is_printable else None,
            "dimensions": stl_result["dimensions"],
            "stats": stl_result["stats"],
            "printer_id": printer_id
        }
    }