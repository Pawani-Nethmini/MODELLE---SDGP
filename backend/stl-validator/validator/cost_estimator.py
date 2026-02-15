import trimesh

MATERIAL_DENSITY = {
    "PLA": 1.24,
    "ABS": 1.04,
    "PETG": 1.27,
    "RESIN": 1.10
}

MATERIAL_PRICE_PER_GRAM = {
    "PLA": 20,     # LKR
    "ABS": 22,
    "PETG": 25,
    "RESIN": 20
}

MACHINE_RATE = {
    "FDM": 300,    # LKR per hour
    "SLA": 600,
    "SLS": 900
}

PRINT_SPEED = {
    "FDM": 30,     # cm3 per hour
    "SLA": 20,
    "SLS": 15
}

LABOUR_COST = 400
MARKUP_FACTOR = 1.3


def estimate_print_cost(file_path: str, material: str, technology: str, infill: float):
    """
    Estimate 3D printing cost based on STL + parameters
    """

    mesh = trimesh.load(file_path, force="mesh")

    if mesh.is_empty or mesh.volume <= 0:
        raise ValueError("Invalid or non-printable STL file")

    # Volume in cm3
    volume_cm3 = mesh.volume / 1000

    # Material cost
    density = MATERIAL_DENSITY[material]
    price_per_gram = MATERIAL_PRICE_PER_GRAM[material]

    effective_volume = volume_cm3 * infill
    weight_grams = effective_volume * density
    material_cost = weight_grams * price_per_gram

    # Machine cost
    speed = PRINT_SPEED[technology]
    print_time = volume_cm3 / speed
    machine_cost = print_time * MACHINE_RATE[technology]

    base_cost = material_cost + machine_cost + LABOUR_COST
    total_cost = base_cost * MARKUP_FACTOR

    return {
        "volume_cm3": round(volume_cm3, 2),
        "material": material,
        "technology": technology,
        "infill_percent": infill * 100,
        "material_cost": round(material_cost, 2),
        "machine_cost": round(machine_cost, 2),
        "labour_cost": LABOUR_COST,
        "total_cost": round(total_cost, 2)
    }
