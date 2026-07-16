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

// Member Profile
router.post("/profile", authenticate, createProfile);
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

// Assign Trainer (Admin only)
router.post(
  "/:memberId/assign-trainer/:trainerId",
  authenticate,
  authorize("ADMIN"),
  assignTrainerToMember
);

export default router;