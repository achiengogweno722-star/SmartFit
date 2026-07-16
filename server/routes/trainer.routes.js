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

// Get all trainers
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MEMBER"),
  getTrainers
);

// Trainer creates own profile
router.post(
  "/profile",
  authenticate,
  authorize("TRAINER"),
  createTrainer
);

export default router;