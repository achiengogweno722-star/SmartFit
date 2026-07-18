import prisma from "../config/prisma.js";

export const getDashboardStatistics = async () => {
  // Total Members
  const totalMembers = await prisma.memberProfile.count();

  // Total Trainers
  const totalTrainers = await prisma.trainerProfile.count();

  // Total Workout Plans
  const totalWorkoutPlans = await prisma.workoutPlan.count();

  // Total Workout Completions
  const totalWorkoutCompletions = await prisma.workoutLog.count({
  where: {
    completed: true,
  },
});

  // Total Calories Burned
  const calories = await prisma.workoutLog.aggregate({
    _sum: {
      caloriesBurned: true,
    },
  });

  // Average BMI
  const bmi = await prisma.memberProfile.aggregate({
    _avg: {
      bmi: true,
    },
  });

  // Average Weight
  const weight = await prisma.memberProfile.aggregate({
    _avg: {
      weight: true,
    },
  });

  // Most Popular Workout
  const popularWorkout = await prisma.workoutLog.groupBy({
  by: ["workoutPlanId"],
  where: {
    completed: true,
  },
  _count: {
    workoutPlanId: true,
  },
  orderBy: {
    _count: {
      workoutPlanId: "desc",
    },
  },
  take: 1,
});

  let mostPopularWorkout = "No workouts completed";

  if (popularWorkout.length > 0) {
    const workout = await prisma.workoutPlan.findUnique({
      where: {
        id: popularWorkout[0].workoutPlanId,
      },
    });

    if (workout) {
      mostPopularWorkout = workout.name;
    }
  }

  return {
    totalMembers,
    totalTrainers,
    totalWorkoutPlans,
    totalWorkoutCompletions,

    totalCaloriesBurned:
      calories._sum.caloriesBurned ?? 0,

    averageBMI: Number(
      (bmi._avg.bmi ?? 0).toFixed(2)
    ),

    averageWeight: Number(
      (weight._avg.weight ?? 0).toFixed(2)
    ),

    mostPopularWorkout,
  };
};