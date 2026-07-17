import { generateNutritionRecommendation } from "../services/nutrition.service.js";

// Generate Nutrition Recommendation
export const recommendMealPlan = async (req, res) => {
  try {
    const memberId = Number(req.params.memberId);

    const mealPlan = await generateNutritionRecommendation(memberId);

    res.status(200).json({
      success: true,
      message: "Nutrition recommendation generated successfully.",
      recommendation: mealPlan,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};