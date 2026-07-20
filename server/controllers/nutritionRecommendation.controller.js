import { generateNutritionRecommendations } from "../services/nutritionRecommendation.service.js";

// Generate Nutrition Recommendations
export const getNutritionRecommendations = async (req, res) => {
  try {
    // Use the logged-in user's ID instead of req.params
    const recommendations = await generateNutritionRecommendations(
      req.user.id
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