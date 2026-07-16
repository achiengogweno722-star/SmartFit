import express from "express";
import { getRecommendations } from "../controllers/recommendation.controller.js";

const router = express.Router();

router.get("/:memberId", getRecommendations);

export default router;