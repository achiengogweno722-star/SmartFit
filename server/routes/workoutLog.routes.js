import express from "express";

import {
  completeWorkout,
  getCompletedWorkouts,
} from "../controllers/workoutLog.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workout Logs
 *   description: Workout Completion and History APIs
 */

/**
 * @swagger
 * /api/workout-logs:
 *   post:
 *     summary: Log a completed workout
 *     description: Save a completed workout for the authenticated member.
 *     tags: [Workout Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workoutPlanId
 *             properties:
 *               workoutPlanId:
 *                 type: integer
 *                 example: 1
 *               durationCompleted:
 *                 type: integer
 *                 example: 45
 *               caloriesBurned:
 *                 type: integer
 *                 example: 420
 *               notes:
 *                 type: string
 *                 example: Completed all exercises successfully.
 *     responses:
 *       201:
 *         description: Workout logged successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, completeWorkout);

/**
 * @swagger
 * /api/workout-logs:
 *   get:
 *     summary: Get workout history
 *     description: Retrieve all completed workouts for the authenticated member.
 *     tags: [Workout Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workout history retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getCompletedWorkouts);

export default router;