import { Router } from "express";
import { getProjectInsights } from "../controllers/insightsController.js";

const router = Router();

router.get("/", getProjectInsights);

export default router;

