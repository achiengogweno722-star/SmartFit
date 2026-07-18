import prisma from "../config/prisma.js";
import { recommendMealPlan } from "./meal.service.js";

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

  // Get the best meal plan for the member's fitness goal
  const mealPlan = await recommendMealPlan(member.fitnessGoal);

  // Save the recommendation
  const recommendation = await prisma.nutritionRecommendation.create({
    data: {
      memberId: member.id,
      mealPlanId: mealPlan.id,
      recommendationScore: 100,
      reason: `Recommended because your fitness goal is ${member.fitnessGoal}.`,
    },
    include: {
      mealPlan: true,
      member: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return recommendation;
};