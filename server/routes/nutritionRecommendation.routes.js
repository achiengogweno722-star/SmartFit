import express from "express";
import { getNutritionRecommendations } from "../controllers/nutritionRecommendation.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate nutrition recommendations for a member
router.get(
  "/:memberId",
  authenticate,
  authorize("ADMIN", "TRAINER", "MEMBER"),
  getNutritionRecommendations
);

export default router;