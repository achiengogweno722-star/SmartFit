import prisma from "../config/prisma.js";

// Create Exercise
export const createExercise = async (data) => {
  // Ensure workout exists
  const workout = await prisma.workoutPlan.findUnique({
    where: {
      id: data.workoutPlanId,
    },
  });

  if (!workout) {
    throw new Error("Workout plan not found.");
  }

  return await prisma.exercise.create({
    data,
  });
};

// Get All Exercises
export const getExercises = async () => {
  return await prisma.exercise.findMany({
    include: {
      workoutPlan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get Exercise By ID
export const getExercise = async (id) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      workoutPlan: true,
    },
  });

  if (!exercise) {
    throw new Error("Exercise not found.");
  }

  return exercise;
};

// Get Exercises for a Workout
export const getWorkoutExercises = async (workoutPlanId) => {
  return await prisma.exercise.findMany({
    where: {
      workoutPlanId,
    },
    orderBy: {
      id: "asc",
    },
  });
};

// Update Exercise
export const updateExercise = async (id, data) => {
  await getExercise(id);

  return await prisma.exercise.update({
    where: {
      id,
    },
    data,
  });
};

// Delete Exercise
export const deleteExercise = async (id) => {
  await getExercise(id);

  await prisma.exercise.delete({
    where: {
      id,
    },
  });

  return {
    message: "Exercise deleted successfully.",
  };
};