import prisma from "../config/prisma.js";

export const generateRecommendations = async (memberId) => {
  // Get member profile
  const member = await prisma.memberProfile.findUnique({
    where: { id: Number(memberId) },
  });

  if (!member) {
    throw new Error("Member not found.");
  }

  // Get all active workout plans
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      isActive: true,
    },
  });

  const recommendations = [];

  for (const plan of workoutPlans) {
    let score = 0;
    const reasons = [];

    // Goal Match
    if (plan.targetGoal === member.fitnessGoal) {
      score += 40;
      reasons.push("Fitness goal matches");
    }

    // Fitness Level Match
    if (plan.difficulty === member.fitnessLevel) {
      score += 30;
      reasons.push("Fitness level matches");
    }

    // Workout Days Match
    if (plan.sessionsPerWeek <= member.availableDaysPerWeek) {
      score += 20;
      reasons.push("Fits your weekly schedule");
    }

    // Equipment Match
    if (!plan.equipmentRequired) {
      score += 10;
      reasons.push("No equipment required");
    }

    recommendations.push({
      workoutPlanId: plan.id,
      workoutName: plan.name,
      score,
      reason: reasons.join(", "),
    });
  }

  recommendations.sort((a, b) => b.score - a.score);

  return recommendations;
};