import { computeSTLMetrics, parseSTLBufferToGeometry } from "../services/stlMetricsService.js";

export const computeMetrics = async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "STL file is required (field name: file).",
      });
    }

    const {
      material = "PLA",
      infillPercent = 20,
      wallThicknessMm = 1.2,
      filamentDiameterMm = 1.75,
      overhangAngleDeg = 45,
    } = req.body || {};

    const geometry = parseSTLBufferToGeometry(req.file.buffer);

    const metrics = computeSTLMetrics(geometry, {
      material,
      infillPercent: Number(infillPercent),
      wallThicknessMm: Number(wallThicknessMm),
      filamentDiameterMm: Number(filamentDiameterMm),
      overhangAngleDeg: Number(overhangAngleDeg),
    });

    return res.json({
      success: true,
      fileName: req.file.originalname,
      metrics,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to compute STL metrics.",
      error: err?.message || String(err),
    });
  }
};
