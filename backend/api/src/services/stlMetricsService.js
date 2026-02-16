import * as THREE from "three";
import { STLLoader } from "three-stdlib";

/**
 *Assumes STL units = millimeters (typical in printing).
 */

function triangleArea(ax, ay, az, bx, by, bz, cx, cy, cz) {
  const abx = bx - ax, aby = by - ay, abz = bz - az;
  const acx = cx - ax, acy = cy - ay, acz = cz - az;

  const cxp = aby * acz - abz * acy;
  const cyp = abz * acx - abx * acz;
  const czp = abx * acy - aby * acx;

  return 0.5 * Math.sqrt(cxp * cxp + cyp * cyp + czp * czp);
}

function signedTetraVolume(ax, ay, az, bx, by, bz, cx, cy, cz) {
  return (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6.0;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function parseSTLBufferToGeometry(buffer) {
  const loader = new STLLoader();
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  const geometry = loader.parse(arrayBuffer);

  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  return geometry;
}

export function computeSTLMetrics(geometry, options = {}) {
  const {
    material = "PLA",
    infillPercent = 20,
    wallThicknessMm = 1.2,
    filamentDiameterMm = 1.75,
    overhangAngleDeg = 45,
  } = options;

  const densities_g_cm3 = { PLA: 1.24, ABS: 1.04, PETG: 1.27, RESIN: 1.10 };

  const pos = geometry.attributes.position;
  const triCount = pos.count / 3;

  let areaMm2 = 0;
  let signedVolMm3 = 0;

  let overhangAreaMm2 = 0;
  const cosThreshold = Math.cos((overhangAngleDeg * Math.PI) / 180);

  for (let i = 0; i < pos.count; i += 3) {
    const ax = pos.getX(i), ay = pos.getY(i), az = pos.getZ(i);
    const bx = pos.getX(i + 1), by = pos.getY(i + 1), bz = pos.getZ(i + 1);
    const cx = pos.getX(i + 2), cy = pos.getY(i + 2), cz = pos.getZ(i + 2);

    const a = triangleArea(ax, ay, az, bx, by, bz, cx, cy, cz);
    areaMm2 += a;

    signedVolMm3 += signedTetraVolume(ax, ay, az, bx, by, bz, cx, cy, cz);

    // Triangle normal (for overhang approximation)
    const abx = bx - ax, aby = by - ay, abz = bz - az;
    const acx = cx - ax, acy = cy - ay, acz = cz - az;
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;

    const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    const nzUnit = nz / nLen;

    if (nzUnit < cosThreshold) overhangAreaMm2 += a;
  }

  const volMm3 = Math.abs(signedVolMm3);

  const bbox = geometry.boundingBox || new THREE.Box3().setFromBufferAttribute(pos);
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const volCm3 = volMm3 / 1000;
  const areaCm2 = areaMm2 / 100;

  const infill = Math.min(Math.max(infillPercent, 0), 100) / 100;

  // Heuristic estimate (not a slicer):
  const wallVolumeMm3 = areaMm2 * wallThicknessMm * 0.35;
  const infillVolumeMm3 = volMm3 * infill;
  const estimatedMaterialVolMm3 = Math.min(volMm3, wallVolumeMm3 + infillVolumeMm3);
  const estimatedMaterialVolCm3 = estimatedMaterialVolMm3 / 1000;

  const density = densities_g_cm3[material] ?? densities_g_cm3.PLA;
  const weightGrams = estimatedMaterialVolCm3 * density;

  const filamentAreaMm2 = Math.PI * Math.pow(filamentDiameterMm / 2, 2);
  const filamentLengthMm = filamentAreaMm2 > 0 ? estimatedMaterialVolMm3 / filamentAreaMm2 : 0;
  const filamentLengthM = filamentLengthMm / 1000;

  const overhangPercent = areaMm2 > 0 ? (overhangAreaMm2 / areaMm2) * 100 : 0;

  // Thinness: higher means thinner/more complex
  const thinness = volMm3 > 0 ? (Math.pow(areaMm2, 1.5) / volMm3) : 0;

  const triScore = Math.min(1, triCount / 200000);
  const overhangScore = Math.min(1, overhangPercent / 60);
  const thinScore = Math.min(1, thinness / 8000);

  const complexityScore = Math.round((triScore * 40 + overhangScore * 35 + thinScore * 25) * 100);

  return {
    triangleCount: Math.round(triCount),
    bboxMm: { x: round2(size.x), y: round2(size.y), z: round2(size.z) },
    volumeCm3: round2(volCm3),
    surfaceAreaCm2: round2(areaCm2),
    estimatedMaterialVolumeCm3: round2(estimatedMaterialVolCm3),
    estimatedWeightGrams: round2(weightGrams),
    filamentLengthM: round2(filamentLengthM),
    overhangPercent: round2(overhangPercent),
    thinnessIndex: round2(thinness),
    complexityScore, // 0–100
  };
}
