import express from "express";
import multer from "multer";
import { computeMetrics } from "../controllers/metricsController.js";

const router = express.Router();

// memory storage: file stays in RAM, no disk write
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});

router.post("/stl-metrics", upload.single("file"), computeMetrics);

export default router;
