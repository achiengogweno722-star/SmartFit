import {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  assignWorkoutToMember,
} from "../services/workout.service.js";

import {
  workoutSchema,
  updateWorkoutSchema,
} from "../validations/workout.validation.js";

// ==============================
// Create Workout
// ==============================
export const createWorkoutPlan = async (req, res) => {
  try {
    const validatedData = workoutSchema.parse(req.body);

    const workout = await createWorkout(validatedData);

    res.status(201).json({
      success: true,
      message: "Workout plan created successfully.",
      workout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Workouts
// ==============================
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Workout By ID
// ==============================
export const getWorkout = async (req, res) => {
  try {
    const workout = await getWorkoutById(Number(req.params.id));

    res.status(200).json({
      success: true,
      workout,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Workout
// ==============================
export const updateWorkoutPlan = async (req, res) => {
  try {
    const validatedData = updateWorkoutSchema.parse(req.body);

    const workout = await updateWorkout(
      Number(req.params.id),
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Workout updated successfully.",
      workout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Workout
// ==============================
export const removeWorkout = async (req, res) => {
  try {
    const result = await deleteWorkout(Number(req.params.id));

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Assign Workout to Member
// ==============================
export const assignWorkout = async (req, res) => {
  try {
    const workoutId = Number(req.params.workoutId);
    const memberId = Number(req.params.memberId);

    const member = await assignWorkoutToMember(workoutId, memberId);

    res.status(200).json({
      success: true,
      message: "Workout assigned successfully.",
      member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};