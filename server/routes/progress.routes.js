import express from "express";

import {
  createProgressLog,
  getProgressLogs,
} from "../controllers/progress.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Progress Logs
 *   description: Member Progress Tracking APIs
 */

/**
 * @swagger
 * /api/progress:
 *   post:
 *     summary: Create a progress log
 *     description: Record a member's weight, BMI and notes.
 *     tags: [Progress Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *               - bmi
 *             properties:
 *               weight:
 *                 type: number
 *                 example: 72.5
 *               bmi:
 *                 type: number
 *                 example: 24.2
 *               notes:
 *                 type: string
 *                 example: Lost 2kg this month
 *     responses:
 *       201:
 *         description: Progress log created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createProgressLog);

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Get progress history
 *     description: Retrieve all progress logs for the authenticated member.
 *     tags: [Progress Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress logs retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getProgressLogs);

export default router;