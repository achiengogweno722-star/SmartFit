import express from "express";

import {
  createExerciseHandler,
  getAllExercises,
  getExerciseById,
  getExercisesByWorkout,
  updateExerciseHandler,
  deleteExerciseHandler,
} from "../controllers/exercise.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// =========================
// Authenticated Routes
// =========================

// Get all exercises
router.get("/", authenticate, getAllExercises);

// Get exercises for a specific workout
router.get(
  "/workout/:workoutPlanId",
  authenticate,
  getExercisesByWorkout
);

// Get a single exercise by ID
router.get("/:id", authenticate, getExerciseById);

// =========================
// Admin Only Routes
// =========================

// Create exercise
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createExerciseHandler
);

// Update exercise
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateExerciseHandler
);

// Delete exercise
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteExerciseHandler
);

export default router;