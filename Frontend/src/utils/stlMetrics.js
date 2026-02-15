import * as THREE from "three";
import { STLLoader } from "three-stdlib";

/**
 * Assumption:
 * - STL units are in millimeters (common in 3D printing pipelines).
 * If your STLs are in meters, your numbers will look tiny (then we must scale).
 */

export async function loadSTLGeometryFromFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loader = new STLLoader();
  const geometry = loader.parse(arrayBuffer);

  // Ensure normals exist (needed for overhang metric)
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  return geometry;
}

function triangleArea(ax, ay, az, bx, by, bz, cx, cy, cz) {
  const abx = bx - ax, aby = by - ay, abz = bz - az;
  const acx = cx - ax, acy = cy - ay, acz = cz - az;

  const cxp = aby * acz - abz * acy;
  const cyp = abz * acx - abx * acz;
  const czp = abx * acy - aby * acx;

  return 0.5 * Math.sqrt(cxp * cxp + cyp * cyp + czp * czp);
}

/**
 * Signed volume of triangle (tetrahedron to origin).
 * Works for closed meshes (watertight). For non-watertight STL, treat as approximation.
 */
function signedTetraVolume(ax, ay, az, bx, by, bz, cx, cy, cz) {
  return (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6.0;
}

export function computeSTLMetrics(geometry, options = {}) {
  const {
    material = "PLA",
    infillPercent = 20,
    wallThicknessMm = 1.2,
    filamentDiameterMm = 1.75,
    overhangAngleDeg = 45,
  } = options;

  const densities_g_cm3 = {
    PLA: 1.24,
    ABS: 1.04,
    PETG: 1.27,
    RESIN: 1.10, // generic resin approximation
  };

  const pos = geometry.attributes.position;
  const triCount = pos.count / 3;

  let areaMm2 = 0;
  let signedVolMm3 = 0;

  // Overhang: percent of surface area where face normal points downward past threshold
  // We approximate normal using triangle cross product and compare with +Z axis.
  let overhangAreaMm2 = 0;
  const cosThreshold = Math.cos((overhangAngleDeg * Math.PI) / 180);

  for (let i = 0; i < pos.count; i += 3) {
    const ax = pos.getX(i), ay = pos.getY(i), az = pos.getZ(i);
    const bx = pos.getX(i + 1), by = pos.getY(i + 1), bz = pos.getZ(i + 1);
    const cx = pos.getX(i + 2), cy = pos.getY(i + 2), cz = pos.getZ(i + 2);

    const a = triangleArea(ax, ay, az, bx, by, bz, cx, cy, cz);
    areaMm2 += a;

    signedVolMm3 += signedTetraVolume(ax, ay, az, bx, by, bz, cx, cy, cz);

    // normal
    const abx = bx - ax, aby = by - ay, abz = bz - az;
    const acx = cx - ax, acy = cy - ay, acz = cz - az;
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;

    const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    const nzUnit = nz / nLen;

    // if normal is facing downward enough, likely needs supports
    // "downward" means nzUnit < cos(180 - angle) but easier: consider triangles with nzUnit < cosThreshold as "steep".
    // For printing, overhang is when normal is close to horizontal or negative z. We mark if nzUnit < cosThreshold.
    if (nzUnit < cosThreshold) {
      overhangAreaMm2 += a;
    }
  }

  const volMm3 = Math.abs(signedVolMm3);

  const bbox = geometry.boundingBox || new THREE.Box3().setFromBufferAttribute(pos);
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const bboxMm = {
    x: size.x,
    y: size.y,
    z: size.z,
  };

  // Unit conversions
  const volCm3 = volMm3 / 1000; // 1 cm3 = 1000 mm3
  const areaCm2 = areaMm2 / 100; // 1 cm2 = 100 mm2

  // Material usage estimation (heuristic, not a slicer):
  // - Infill contributes proportionally to volume
  // - Walls contribute roughly: surface area * wall thickness * factor
  // This is a decent engineering estimate for reports / UI, not production quoting.
  const infill = Math.min(Math.max(infillPercent, 0), 100) / 100;

  const wallVolumeMm3 = areaMm2 * wallThicknessMm * 0.35; // 0.35 is a heuristic factor
  const infillVolumeMm3 = volMm3 * infill;

  const estimatedMaterialVolMm3 = Math.min(volMm3, wallVolumeMm3 + infillVolumeMm3);
  const estimatedMaterialVolCm3 = estimatedMaterialVolMm3 / 1000;

  const density = densities_g_cm3[material] ?? densities_g_cm3.PLA;
  const weightGrams = estimatedMaterialVolCm3 * density;

  // Filament length estimate (for FDM): Length = volume / cross-sectional area
  const filamentAreaMm2 = Math.PI * Math.pow(filamentDiameterMm / 2, 2);
  const filamentLengthMm = filamentAreaMm2 > 0 ? estimatedMaterialVolMm3 / filamentAreaMm2 : 0;
  const filamentLengthM = filamentLengthMm / 1000;

  // Complexity metrics (simple but defensible)
  const overhangPercent = areaMm2 > 0 ? (overhangAreaMm2 / areaMm2) * 100 : 0;

  // "Thinness" heuristic: higher surface-to-volume implies thin / complex geometry
  // Use normalized ratio (area^1.5 / volume) to avoid unit issues.
  const thinness = volMm3 > 0 ? (Math.pow(areaMm2, 1.5) / volMm3) : 0;

  // Complexity score (0–100) weighted
  const triScore = Math.min(1, triCount / 200000);        // 200k triangles ~ heavy
  const overhangScore = Math.min(1, overhangPercent / 60); // 60% overhang ~ nasty
  const thinScore = Math.min(1, thinness / 8000);          // depends on model scale

  const complexityScore = Math.round(
    (triScore * 40 + overhangScore * 35 + thinScore * 25) * 100
  ) / 100;

  return {
    triangleCount: Math.round(triCount),
    bboxMm: {
      x: round2(bboxMm.x),
      y: round2(bboxMm.y),
      z: round2(bboxMm.z),
    },
    volumeCm3: round2(volCm3),
    surfaceAreaCm2: round2(areaCm2),
    estimatedMaterialVolumeCm3: round2(estimatedMaterialVolCm3),
    estimatedWeightGrams: round2(weightGrams),
    filamentLengthM: round2(filamentLengthM),
    overhangPercent: round2(overhangPercent),
    thinnessIndex: round2(thinness),
    complexityScore, // 0-100-ish
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
