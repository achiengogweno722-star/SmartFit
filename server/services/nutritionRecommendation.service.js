import prisma from "../config/prisma.js";

export const generateNutritionRecommendations = async (userId) => {
  // Find member profile using logged-in user's ID
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  // Get all active meal plans
  const mealPlans = await prisma.mealPlan.findMany({
    where: {
      isActive: true,
    },
  });

  // Remove old recommendations
  await prisma.nutritionRecommendation.deleteMany({
    where: {
      memberId: member.id,
    },
  });

  const recommendations = [];

  // Generate recommendations
  for (const meal of mealPlans) {
    let score = 0;
    const reasons = [];

    if (meal.goal === member.fitnessGoal) {
      score += 100;
      reasons.push("Matches your fitness goal");
    }

    const recommendation =
      await prisma.nutritionRecommendation.create({
        data: {
          memberId: member.id,
          mealPlanId: meal.id,
          recommendationScore: score,
          reason:
            reasons.length > 0
              ? reasons.join(", ")
              : "General healthy meal plan",
        },
        include: {
          mealPlan: true,
        },
      });

    recommendations.push(recommendation);
  }

  // Return highest scoring recommendations first
  return recommendations.sort(
    (a, b) => b.recommendationScore - a.recommendationScore
  );
};