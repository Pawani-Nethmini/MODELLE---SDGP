
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import paymentRoutes from "./routes/payment.js";
import validatorRoutes from "./routes/validatorRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../../.env"), 
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/payment", paymentRoutes);
app.use("/api/validate", validatorRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MERCHANT_ID: ${process.env.PAYHERE_MERCHANT_ID}`);
});

export default app;