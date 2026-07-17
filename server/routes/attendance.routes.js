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

// Member
router.post("/check-in", authenticate, authorize("MEMBER"), checkInHandler);

router.put("/check-out", authenticate, authorize("MEMBER"), checkOutHandler);

router.get("/my-history", authenticate, authorize("MEMBER"), myAttendanceHandler);

// Admin & Trainer
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  allAttendanceHandler
);

router.get(
  "/active",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  activeMembersHandler
);

export default router;