import express from "express";
import {
  createTrainer,
  getTrainers,
} from "../controllers/trainer.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trainers
 *   description: Trainer Management APIs
 */

/**
 * @swagger
 * /api/trainers:
 *   get:
 *     summary: Get all trainers
 *     description: Retrieve all registered trainers.
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trainers retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MEMBER"),
  getTrainers
);

/**
 * @swagger
 * /api/trainers/profile:
 *   post:
 *     summary: Create trainer profile
 *     description: Allows an authenticated trainer to create their profile.
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialization
 *               - experience
 *             properties:
 *               specialization:
 *                 type: string
 *                 example: Strength Training
 *               experience:
 *                 type: integer
 *                 example: 5
 *               phoneNumber:
 *                 type: string
 *                 example: "+254712345678"
 *     responses:
 *       201:
 *         description: Trainer profile created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/profile",
  authenticate,
  authorize("TRAINER"),
  createTrainer
);

export default router;