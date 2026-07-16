import express from "express";

import {
  completeWorkout,
  getCompletedWorkouts,
} from "../controllers/workoutLog.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Log a completed workout
router.post("/", authenticate, completeWorkout);

// Get workout history
router.get("/", authenticate, getCompletedWorkouts);

export default router;