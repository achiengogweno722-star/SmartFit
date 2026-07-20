import { generateRecommendations } from "../services/recommendation.service.js";

// Generate Workout Recommendations
export const getRecommendations = async (req, res) => {
  try {
    // Debug: Check the logged-in user from the JWT
    console.log("========== AUTH USER ==========");
    console.log(req.user);
    console.log("===============================");

    // Generate recommendations using the logged-in user's ID
    const recommendations = await generateRecommendations(req.user.id);

    res.status(200).json({
      success: true,
      message: "Recommendations generated successfully.",
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};