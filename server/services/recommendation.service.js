import prisma from "../config/prisma.js";

export const generateRecommendations = async (userId) => {
  console.log("==================================");
  console.log("Searching MemberProfile for userId:", userId);

  // Find member profile using the logged-in user's ID
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  console.log("Member found:", member);
  console.log("==================================");

  if (!member) {
    throw new Error("Member profile not found.");
  }

  // Get active workout plans
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      isActive: true,
    },
  });

  console.log("Workout plans found:", workoutPlans.length);

  const recommendations = [];

  // Remove old recommendations
  await prisma.recommendation.deleteMany({
    where: {
      memberId: member.id,
    },
  });

  // Generate new recommendations
  for (const plan of workoutPlans) {
    let score = 0;
    const reasons = [];

    // Fitness Goal
    if (plan.targetGoal === member.fitnessGoal) {
      score += 40;
      reasons.push("Fitness goal matches");
    }

    // Fitness Level
    if (plan.difficulty === member.fitnessLevel) {
      score += 30;
      reasons.push("Fitness level matches");
    }

    // Available Days
    if (plan.sessionsPerWeek <= member.availableDaysPerWeek) {
      score += 20;
      reasons.push("Fits your weekly schedule");
    }

    // Equipment
    if (!plan.equipmentRequired) {
      score += 10;
      reasons.push("No equipment required");
    }

    const recommendation = await prisma.recommendation.create({
      data: {
        memberId: member.id,
        workoutPlanId: plan.id,
        recommendationScore: score,
        reason: reasons.join(", "),
      },
      include: {
        workoutPlan: true,
      },
    });

    recommendations.push(recommendation);
  }

  recommendations.sort(
    (a, b) => b.recommendationScore - a.recommendationScore
  );

  console.log("Recommendations generated:", recommendations.length);

  return recommendations;
};