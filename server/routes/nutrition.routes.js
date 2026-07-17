import express from "express";
import { recommendMealPlan } from "../controllers/nutrition.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate nutrition recommendation
router.post(
  "/recommend/:memberId",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  recommendMealPlan
);

export default router;