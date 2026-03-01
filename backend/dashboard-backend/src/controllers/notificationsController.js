import { dashboardData } from "../data/dashboardData.js";

export const getNotifications = (req, res) => {
  return res.json({
    success: true,
    data: dashboardData.notifications,
  });
};

