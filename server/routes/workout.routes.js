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

/**
 * @swagger
 * tags:
 *   name: Workout Plans
 *   description: Workout Plan Management APIs
 */

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workout plans
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workout plans
 */
router.get("/", authenticate, getWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get workout plan by ID
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Workout plan found
 *       404:
 *         description: Workout plan not found
 */
router.get("/:id", authenticate, getWorkout);

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a workout plan
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - targetGoal
 *               - difficulty
 *               - duration
 *               - calories
 *               - sessionsPerWeek
 *               - estimatedWeeks
 *             properties:
 *               name:
 *                 type: string
 *                 example: Beginner Weight Loss
 *               description:
 *                 type: string
 *                 example: Workout plan for beginners
 *               category:
 *                 type: string
 *                 example: Cardio
 *               targetGoal:
 *                 type: string
 *                 enum:
 *                   - WEIGHT_LOSS
 *                   - MUSCLE_GAIN
 *                   - STRENGTH
 *                   - ENDURANCE
 *                   - GENERAL_FITNESS
 *               difficulty:
 *                 type: string
 *                 enum:
 *                   - BEGINNER
 *                   - INTERMEDIATE
 *                   - ADVANCED
 *               duration:
 *                 type: integer
 *                 example: 45
 *               calories:
 *                 type: integer
 *                 example: 400
 *               equipmentRequired:
 *                 type: boolean
 *                 example: false
 *               sessionsPerWeek:
 *                 type: integer
 *                 example: 4
 *               estimatedWeeks:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       201:
 *         description: Workout plan created successfully
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createWorkoutPlan
);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout plan
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Workout updated successfully
 */
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateWorkoutPlan
);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout plan
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  removeWorkout
);

/**
 * @swagger
 * /api/workouts/{workoutId}/assign/{memberId}:
 *   post:
 *     summary: Assign a workout plan to a member
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Workout assigned successfully
 */
router.post(
  "/:workoutId/assign/:memberId",
  authenticate,
  authorize("ADMIN"),
  assignWorkout
);

export default router;