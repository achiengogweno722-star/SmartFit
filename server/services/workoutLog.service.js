import prisma from "../config/prisma.js";

// Log Workout Completion
export const logWorkoutCompletion = async (userId, data) => {
  // Find member profile
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  // Check workout exists
  const workout = await prisma.workoutPlan.findUnique({
    where: {
      id: data.workoutPlanId,
    },
  });

  if (!workout) {
    throw new Error("Workout plan not found.");
  }

  // Save workout log
  return await prisma.workoutLog.create({
    data: {
      memberId: member.id,
      workoutPlanId: data.workoutPlanId,
      completed: true,
      durationCompleted: data.durationCompleted,
      caloriesBurned: data.caloriesBurned,
      notes: data.notes,
      completedAt: new Date(),
    },
    include: {
      workoutPlan: true,
    },
  });
};

// Get Workout History
export const getWorkoutHistory = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return await prisma.workoutLog.findMany({
    where: {
      memberId: member.id,
    },
    include: {
      workoutPlan: true,
    },
    orderBy: {
      completedAt: "desc",
    },
  });
};