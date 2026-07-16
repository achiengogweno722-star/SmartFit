import { generateRecommendations } from "../services/recommendation.service.js";

export const getRecommendations = async (req, res) => {
  try {
    const { memberId } = req.params;

    const recommendations = await generateRecommendations(memberId);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};