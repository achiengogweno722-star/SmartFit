import express from "express";
import { getNutritionRecommendations } from "../controllers/nutritionRecommendation.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Get nutrition recommendations for the logged-in member
router.get(
  "/",
  authenticate,
  authorize("MEMBER"),
  getNutritionRecommendations
);

// Get nutrition recommendations for a specific member by admin or trainer
router.get(
  "/:memberId",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  getNutritionRecommendations
);

export default router;
