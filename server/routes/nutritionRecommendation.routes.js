import express from "express";
import { getNutritionRecommendations } from "../controllers/nutritionRecommendation.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Nutrition Recommendations
 *   description: AI Nutrition Recommendation APIs
 */

/**
 * @swagger
 * /api/nutrition-recommendations/{memberId}:
 *   get:
 *     summary: Generate nutrition recommendations for a member
 *     description: Returns personalized meal plan recommendations based on the member's fitness goal.
 *     tags: [Nutrition Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Nutrition recommendations generated successfully
 *       400:
 *         description: Invalid member ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/:memberId",
  authenticate,
  authorize("ADMIN", "TRAINER", "MEMBER"),
  getNutritionRecommendations
);

export default router;