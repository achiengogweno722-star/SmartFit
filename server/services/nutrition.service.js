import prisma from "../config/prisma.js";

export const generateNutritionRecommendation = async (memberId) => {
  // Find member profile
  const member = await prisma.memberProfile.findUnique({
    where: {
      id: memberId,
    },
  });

  if (!member) {
    throw new Error("Member not found.");
  }

  // Find meal plans matching the member's goal
  const mealPlans = await prisma.mealPlan.findMany({
    where: {
      goal: member.fitnessGoal,
      isActive: true,
    },
  });

  if (mealPlans.length === 0) {
    throw new Error("No suitable meal plans found.");
  }

  // Pick the first matching meal plan
  const mealPlan = mealPlans[0];

  // Save recommendation
  await prisma.nutritionRecommendation.create({
    data: {
      memberId: member.id,
      mealPlanId: mealPlan.id,
      recommendationScore: 100,
      reason: "Matches your fitness goal.",
    },
  });

  return mealPlan;
};