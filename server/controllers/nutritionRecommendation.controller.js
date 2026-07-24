import { generateNutritionRecommendations } from "../services/nutritionRecommendation.service.js";

// Generate Nutrition Recommendations
export const getNutritionRecommendations = async (req, res) => {
  try {
    const requestedMemberId = req.params.memberId
      ? Number(req.params.memberId)
      : undefined;

    if (req.params.memberId && isNaN(requestedMemberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID.",
      });
    }

    const recommendations = await generateNutritionRecommendations(
      req.user.id,
      requestedMemberId
    );

    res.status(200).json({
      success: true,
      message: "Nutrition recommendations generated successfully.",
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
