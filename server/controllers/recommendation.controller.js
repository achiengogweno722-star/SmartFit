import { generateRecommendations } from "../services/recommendation.service.js";

// Generate Recommendations
export const getRecommendations = async (req, res) => {
  try {
    const memberId = Number(req.params.memberId);

    if (isNaN(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID.",
      });
    }

    const recommendations = await generateRecommendations(memberId);

    res.status(200).json({
      success: true,
      message: "Recommendations generated successfully.",
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