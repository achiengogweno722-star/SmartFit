import { generateRecommendations } from "../services/recommendation.service.js";

// Generate Workout Recommendations
export const getRecommendations = async (req, res) => {
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

    const recommendations = await generateRecommendations(
      req.user.id,
      requestedMemberId
    );

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
