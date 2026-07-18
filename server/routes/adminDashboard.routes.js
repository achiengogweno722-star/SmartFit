import express from "express";
import { getDashboard } from "../controllers/adminDashboard.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin Dashboard and Analytics APIs
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     description: Returns overall statistics including users, members, trainers, workout plans, attendance, recommendations and other dashboard metrics.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getDashboard
);

export default router;