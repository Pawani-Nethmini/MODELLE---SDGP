import { dashboardData } from "../data/dashboardData.js";

export const getActiveOrders = (req, res) => {
  return res.json({
    success: true,
    data: dashboardData.activeOrders,
  });
};

