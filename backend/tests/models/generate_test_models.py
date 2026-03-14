import os
import trimesh

base_dir = os.path.dirname(__file__)
thickness_values = [0.2, 0.4, 1.0]

for t in thickness_values:
    outer = trimesh.creation.box(extents=[20,20,20])
    inner = trimesh.creation.box(extents=[20-2*t,20-2*t,20-2*t])
    inner.apply_translation(outer.centroid-inner.centroid)
    shell = outer.difference(inner)
    shell.export(os.path.join(base_dir,f"cube_wall_{t}.stl"))

# solid cube
solid = trimesh.creation.box(extents=[20,20,20])
solid.export(os.path.join(base_dir,"solid_cube.stl"))

print("Test models generated successfully.")