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

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Exercise Management APIs
 */

/**
 * @swagger
 * /api/exercises/test:
 *   get:
 *     summary: Test exercise routes
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Exercise routes are working
 */
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Exercise routes are working!",
  });
});

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercises
 */
router.get("/", authenticate, getAllExercises);

/**
 * @swagger
 * /api/exercises/workout/{workoutPlanId}:
 *   get:
 *     summary: Get exercises for a workout plan
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutPlanId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Workout exercises retrieved successfully
 */
router.get(
  "/workout/:workoutPlanId",
  authenticate,
  getExercisesByWorkout
);

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercises]
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
 *         description: Exercise found
 *       404:
 *         description: Exercise not found
 */
router.get("/:id", authenticate, getExerciseById);

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercises]
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
 *               - name
 *               - description
 *               - sets
 *               - restSeconds
 *               - difficulty
 *             properties:
 *               workoutPlanId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Push Ups
 *               description:
 *                 type: string
 *                 example: Standard push up exercise
 *               sets:
 *                 type: integer
 *                 example: 3
 *               reps:
 *                 type: integer
 *                 example: 15
 *               durationSeconds:
 *                 type: integer
 *                 example: 60
 *               restSeconds:
 *                 type: integer
 *                 example: 30
 *               difficulty:
 *                 type: string
 *                 enum:
 *                   - BEGINNER
 *                   - INTERMEDIATE
 *                   - ADVANCED
 *     responses:
 *       201:
 *         description: Exercise created successfully
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createExerciseHandler
);

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Update an exercise
 *     tags: [Exercises]
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
 *         description: Exercise updated successfully
 */
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateExerciseHandler
);

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     tags: [Exercises]
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
 *         description: Exercise deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteExerciseHandler
);

export default router;