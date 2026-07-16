import express from "express";
import {
  createWorkoutPlan,
  getWorkouts,
  getWorkout,
  updateWorkoutPlan,
  removeWorkout,
  assignWorkout,
} from "../controllers/workout.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// View Workouts
router.get("/", authenticate, getWorkouts);
router.get("/:id", authenticate, getWorkout);

// Admin Only - Manage Workouts
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createWorkoutPlan
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateWorkoutPlan
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  removeWorkout
);

// Assign Workout to Member
router.post(
  "/:workoutId/assign/:memberId",
  authenticate,
  authorize("ADMIN"),
  assignWorkout
);

export default router;