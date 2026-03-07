// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import paymentRoutes from "./routes/payment.js";
// // resolve __dirname in ES modules
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // load env
// dotenv.config({
//   path: path.resolve(__dirname, "../../../.env"),
// });

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());
// app.use("/api/payment", paymentRoutes);

// // test route
// app.get("/health", (req, res) => {
//   res.json({ status: "OK" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`MERCHANT_ID: ${process.env.PAYHERE_MERCHANT_ID}`);
// });

// export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import paymentRoutes from "./routes/payment.js";
import designerRoutes from "./routes/designerRoutes.js";
import customDesignRoutes from "./routes/customDesignRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../../.env"), // ← also fix: was ../../../ (3 levels), should be ../../ (2 levels)
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/payment", paymentRoutes);
app.use("/api/designers", designerRoutes);
app.use("/api/custom-design", customDesignRoutes);
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;