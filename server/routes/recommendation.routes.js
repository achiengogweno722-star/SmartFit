import express from "express";
import { getRecommendations } from "../controllers/recommendation.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate workout recommendations for a member
router.get(
  "/",
  authenticate,
  getRecommendations
);

export default router;