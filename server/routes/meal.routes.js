import express from "express";

import {
  createMealPlanHandler,
  getAllMealPlans,
  getMealPlanById,
  getMealPlansForGoal,
  updateMealPlanHandler,
  deleteMealPlanHandler,
} from "../controllers/meal.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meal Plans
 *   description: Meal Plan Management APIs
 */

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Get all meal plans
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of meal plans
 */
router.get("/", authenticate, getAllMealPlans);

/**
 * @swagger
 * /api/meals/goal/{goal}:
 *   get:
 *     summary: Get meal plans by fitness goal
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goal
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - WEIGHT_LOSS
 *             - MUSCLE_GAIN
 *             - STRENGTH
 *             - ENDURANCE
 *             - GENERAL_FITNESS
 *     responses:
 *       200:
 *         description: Meal plans retrieved successfully
 */
router.get(
  "/goal/:goal",
  authenticate,
  getMealPlansForGoal
);

/**
 * @swagger
 * /api/meals/{id}:
 *   get:
 *     summary: Get a meal plan by ID
 *     tags: [Meal Plans]
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
 *         description: Meal plan found
 *       404:
 *         description: Meal plan not found
 */
router.get(
  "/:id",
  authenticate,
  getMealPlanById
);

/**
 * @swagger
 * /api/meals:
 *   post:
 *     summary: Create a new meal plan
 *     tags: [Meal Plans]
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
 *               - goal
 *               - calories
 *               - breakfast
 *               - lunch
 *               - dinner
 *             properties:
 *               name:
 *                 type: string
 *                 example: Weight Loss Meal Plan
 *               goal:
 *                 type: string
 *                 enum:
 *                   - WEIGHT_LOSS
 *                   - MUSCLE_GAIN
 *                   - STRENGTH
 *                   - ENDURANCE
 *                   - GENERAL_FITNESS
 *               calories:
 *                 type: integer
 *                 example: 1800
 *               breakfast:
 *                 type: string
 *                 example: Oatmeal with banana
 *               lunch:
 *                 type: string
 *                 example: Grilled chicken with brown rice
 *               dinner:
 *                 type: string
 *                 example: Grilled fish with vegetables
 *               snacks:
 *                 type: string
 *                 example: Greek yogurt
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Meal plan created successfully
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createMealPlanHandler
);

/**
 * @swagger
 * /api/meals/{id}:
 *   put:
 *     summary: Update a meal plan
 *     tags: [Meal Plans]
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
 *         description: Meal plan updated successfully
 */
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateMealPlanHandler
);

/**
 * @swagger
 * /api/meals/{id}:
 *   delete:
 *     summary: Delete a meal plan
 *     tags: [Meal Plans]
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
 *         description: Meal plan deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteMealPlanHandler
);

export default router;