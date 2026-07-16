import prisma from "../config/prisma.js";

// Create Workout
export const createWorkout = async (data) => {
  const workout = await prisma.workoutPlan.create({
    data,
  });

  return workout;
};

// Get All Workouts
export const getAllWorkouts = async () => {
  return await prisma.workoutPlan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get Workout By ID
export const getWorkoutById = async (id) => {
  const workout = await prisma.workoutPlan.findUnique({
    where: {
      id,
    },
  });

  if (!workout) {
    throw new Error("Workout plan not found.");
  }

  return workout;
};

// Update Workout
export const updateWorkout = async (id, data) => {
  await getWorkoutById(id);

  return await prisma.workoutPlan.update({
    where: {
      id,
    },
    data,
  });
};

// Delete Workout
export const deleteWorkout = async (id) => {
  await getWorkoutById(id);

  await prisma.workoutPlan.delete({
    where: {
      id,
    },
  });

  return {
    message: "Workout plan deleted successfully.",
  };
};
// Assign Workout to Member
export const assignWorkoutToMember = async (workoutId, memberId) => {
  // Check workout exists
  const workout = await prisma.workoutPlan.findUnique({
    where: {
      id: workoutId,
    },
  });

  if (!workout) {
    throw new Error("Workout plan not found.");
  }

  // Check member exists
  const member = await prisma.memberProfile.findUnique({
    where: {
      id: memberId,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  // Assign workout
  return await prisma.memberProfile.update({
    where: {
      id: memberId,
    },
    data: {
      workoutPlanId: workoutId,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      workoutPlan: true,
    },
  });
};