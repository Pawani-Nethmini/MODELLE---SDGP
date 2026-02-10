import express from "express";
import { generatePayHereHash } from "../utils/payhere.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/create", async (req, res) => {
  console.log("=== /create hit ===");
  console.log("Body:", req.body);
  console.log("MERCHANT_ID:", process.env.PAYHERE_MERCHANT_ID);
  console.log("SECRET:", process.env.PAYHERE_MERCHANT_SECRET);

  try {
    const { printerId, customer } = req.body;
    console.log("Step 1: parsed body");

    const orderId = "ORD_" + uuidv4().slice(0, 8);
    console.log("Step 2: orderId =", orderId);

    const amount = "5000.00";
    const currency = "LKR";

    const hash = generatePayHereHash(
      process.env.PAYHERE_MERCHANT_ID,
      orderId,
      amount,
      currency,
      process.env.PAYHERE_MERCHANT_SECRET
    );
    console.log("Step 3: hash =", hash);

    res.json({
      merchant_id: process.env.PAYHERE_MERCHANT_ID,
      order_id: orderId,
      amount,
      currency,
      items: "3D Printing Service",
      hash,
      notify_url: "http://localhost:5000/api/payment/notify"
    });
    console.log("Step 4: response sent");

  } catch (err) {
    console.error("=== CRASH ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: "Payment creation failed" });
  }
});

export default router;