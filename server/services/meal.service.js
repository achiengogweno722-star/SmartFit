import prisma from "../config/prisma.js";

// Create Meal Plan
export const createMealPlan = async (data) => {
  return await prisma.mealPlan.create({
    data,
  });
};

// Get All Meal Plans
export const getMealPlans = async () => {
  return await prisma.mealPlan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get Meal Plan By ID
export const getMealPlan = async (id) => {
  const mealPlan = await prisma.mealPlan.findUnique({
    where: {
      id,
    },
  });

  if (!mealPlan) {
    throw new Error("Meal plan not found.");
  }

  return mealPlan;
};

// Update Meal Plan
export const updateMealPlan = async (id, data) => {
  await getMealPlan(id);

  return await prisma.mealPlan.update({
    where: {
      id,
    },
    data,
  });
};

// Delete Meal Plan
export const deleteMealPlan = async (id) => {
  await getMealPlan(id);

  await prisma.mealPlan.delete({
    where: {
      id,
    },
  });

  return {
    message: "Meal plan deleted successfully.",
  };
};

// Get Meal Plans By Fitness Goal
export const getMealPlansByGoal = async (goal) => {
  return await prisma.mealPlan.findMany({
    where: {
      goal,
      isActive: true,
    },
    orderBy: {
      calories: "asc",
    },
  });
};
// Recommend Meal Plan By Member Goal
export const recommendMealPlan = async (fitnessGoal) => {
  const mealPlans = await prisma.mealPlan.findMany({
    where: {
      goal: fitnessGoal,
      isActive: true,
    },
    orderBy: [
      {
        calories: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  if (mealPlans.length === 0) {
    throw new Error("No meal plans available for this fitness goal.");
  }

  return mealPlans[0];
};