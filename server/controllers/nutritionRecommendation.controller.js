import { generateNutritionRecommendations } from "../services/nutritionRecommendation.service.js";

// Generate Nutrition Recommendations
export const getNutritionRecommendations = async (req, res) => {
  try {
    const { memberId } = req.params;

    const recommendations =
      await generateNutritionRecommendations(memberId);

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