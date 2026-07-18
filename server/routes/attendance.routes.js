import express from "express";

import {
  checkInHandler,
  checkOutHandler,
  myAttendanceHandler,
  allAttendanceHandler,
  activeMembersHandler,
} from "../controllers/attendance.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Member Attendance Management
 */

/**
 * @swagger
 * /api/attendance/check-in:
 *   post:
 *     summary: Member check in
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check-in successful
 *       400:
 *         description: Member already checked in
 */
router.post(
  "/check-in",
  authenticate,
  authorize("MEMBER"),
  checkInHandler
);

/**
 * @swagger
 * /api/attendance/check-out:
 *   put:
 *     summary: Member check out
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check-out successful
 *       400:
 *         description: No active check-in found
 */
router.put(
  "/check-out",
  authenticate,
  authorize("MEMBER"),
  checkOutHandler
);

/**
 * @swagger
 * /api/attendance/my-history:
 *   get:
 *     summary: View logged-in member attendance history
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance history retrieved successfully
 */
router.get(
  "/my-history",
  authenticate,
  authorize("MEMBER"),
  myAttendanceHandler
);

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: View all attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  allAttendanceHandler
);

/**
 * @swagger
 * /api/attendance/active:
 *   get:
 *     summary: View members currently checked in
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active members retrieved successfully
 */
router.get(
  "/active",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  activeMembersHandler
);

export default router;