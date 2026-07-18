import prisma from "../config/prisma.js";

export const generateNutritionRecommendations = async (memberId) => {
  // Find member profile using the USER ID
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId: Number(memberId),
    },
  });

  if (!member) {
    throw new Error("Member not found.");
  }

  // Get active meal plans
  const mealPlans = await prisma.mealPlan.findMany({
    where: {
      isActive: true,
    },
  });

  // Remove previous recommendations
  await prisma.nutritionRecommendation.deleteMany({
    where: {
      memberId: member.id,
    },
  });

  // Generate recommendations
  for (const meal of mealPlans) {
    let score = 0;
    const reasons = [];

    // Goal Match
    if (meal.goal === member.fitnessGoal) {
      score += 100;
      reasons.push("Matches your fitness goal");
    }

    await prisma.nutritionRecommendation.create({
      data: {
        memberId: member.id,
        mealPlanId: meal.id,
        recommendationScore: score,
        reason:
          reasons.length > 0
            ? reasons.join(", ")
            : "No matching fitness goal",
      },
    });
  }

  // Return recommendations sorted by score
  return await prisma.nutritionRecommendation.findMany({
    where: {
      memberId: member.id,
    },
    include: {
      mealPlan: true,
    },
    orderBy: {
      recommendationScore: "desc",
    },
  });
};