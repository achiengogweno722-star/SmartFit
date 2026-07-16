import {
  createExercise,
  getExercises,
  getExercise,
  getWorkoutExercises,
  updateExercise,
  deleteExercise,
} from "../services/exercise.service.js";

import {
  exerciseSchema,
  updateExerciseSchema,
} from "../validations/exercise.validation.js";

// Create Exercise
export const createExerciseHandler = async (req, res) => {
  try {
    const validatedData = exerciseSchema.parse(req.body);

    const exercise = await createExercise(validatedData);

    res.status(201).json({
      success: true,
      message: "Exercise created successfully.",
      exercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Exercises
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await getExercises();

    res.status(200).json({
      success: true,
      count: exercises.length,
      exercises,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Exercise By ID
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await getExercise(Number(req.params.id));

    res.status(200).json({
      success: true,
      exercise,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Exercises for a Workout Plan
export const getExercisesByWorkout = async (req, res) => {
  try {
    const exercises = await getWorkoutExercises(
      Number(req.params.workoutPlanId)
    );

    res.status(200).json({
      success: true,
      count: exercises.length,
      exercises,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Exercise
export const updateExerciseHandler = async (req, res) => {
  try {
    const validatedData = updateExerciseSchema.parse(req.body);

    const exercise = await updateExercise(
      Number(req.params.id),
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Exercise updated successfully.",
      exercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Exercise
export const deleteExerciseHandler = async (req, res) => {
  try {
    const result = await deleteExercise(Number(req.params.id));

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