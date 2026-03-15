import { dashboardData } from "../data/dashboardData.js";

export const submitFeedback = (req, res) => {
  const { rating, message = "" } = req.body || {};
  const parsedRating = Number(rating);

  if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be an integer between 1 and 5.",
    });
  }

  if (typeof message !== "string") {
    return res.status(400).json({
      success: false,
      message: "Message must be a string.",
    });
  }

  const item = {
    id: `fb_${Date.now()}`,
    rating: parsedRating,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  dashboardData.feedback.push(item);

  return res.status(201).json({
    success: true,
    data: item,
  });
};

export const getFeedback = (req, res) => {
  return res.json({
    success: true,
    data: dashboardData.feedback,
  });
};

