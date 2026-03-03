import express from "express";
import cors from "cors";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();
const PORT = process.env.DASHBOARD_PORT || 5051;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, service: "dashboard-backend" });
});

app.use("/api/dashboard/notifications", notificationsRoutes);
app.use("/api/dashboard/orders", ordersRoutes);
app.use("/api/dashboard/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Dashboard backend is running on http://localhost:${PORT}`);
});

