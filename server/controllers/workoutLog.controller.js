import {
  logWorkoutCompletion,
  getWorkoutHistory,
} from "../services/workoutLog.service.js";

// Log Workout Completion
export const completeWorkout = async (req, res) => {
  try {
    const workout = await logWorkoutCompletion(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Workout completed successfully.",
      workout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Workout History
export const getCompletedWorkouts = async (req, res) => {
  try {
    const workouts = await getWorkoutHistory(req.user.id);

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};