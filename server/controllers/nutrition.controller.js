import { generateNutritionRecommendation } from "../services/nutrition.service.js";

// Generate Nutrition Recommendation
export const recommendMealPlan = async (req, res) => {
  try {
    const memberId = Number(req.params.memberId);

    // Validate member ID
    if (isNaN(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID.",
      });
    }

    const recommendation = await generateNutritionRecommendation(memberId);

    res.status(200).json({
      success: true,
      message: "Nutrition recommendation generated successfully.",
      recommendation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};