import express from "express";
import {getDesigners, seedDesigner} from "../controllers/designerController.js";

const router = express.Router();

router.get("/", getDesigners);
router.post("/", seedDesigner);

export default router;
