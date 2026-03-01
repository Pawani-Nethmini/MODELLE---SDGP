import { dashboardData } from "../data/dashboardData.js";

export const getProjectInsights = (req, res) => {
  return res.json({
    success: true,
    data: dashboardData.insights,
  });
};

