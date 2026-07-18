import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  assignTrainerToMember,
} from "../controllers/member.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member Profile Management APIs
 */

/**
 * @swagger
 * /api/member/profile:
 *   post:
 *     summary: Create member profile
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Member profile created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/profile", authenticate, createProfile);

/**
 * @swagger
 * /api/member/profile:
 *   get:
 *     summary: Get member profile
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticate, getProfile);

/**
 * @swagger
 * /api/member/profile:
 *   put:
 *     summary: Update member profile
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Member profile updated successfully
 *       400:
 *         description: Invalid request
 */
router.put("/profile", authenticate, updateProfile);

/**
 * @swagger
 * /api/member/{memberId}/assign-trainer/{trainerId}:
 *   post:
 *     summary: Assign trainer to member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: path
 *         name: trainerId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Trainer assigned successfully
 *       404:
 *         description: Member or trainer not found
 */
router.post(
  "/:memberId/assign-trainer/:trainerId",
  authenticate,
  authorize("ADMIN"),
  assignTrainerToMember
);

export default router;