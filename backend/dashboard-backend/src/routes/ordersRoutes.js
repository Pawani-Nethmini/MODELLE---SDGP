import { Router } from "express";
import { getActiveOrders } from "../controllers/ordersController.js";

const router = Router();

router.get("/", getActiveOrders);

export default router;

