import express from "express";

import {
  createMealPlanHandler,
  getAllMealPlans,
  getMealPlanById,
  getMealPlansForGoal,
  updateMealPlanHandler,
  deleteMealPlanHandler,
} from "../controllers/meal.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// =========================
// Authenticated Routes
// =========================

// Get all meal plans
router.get("/", authenticate, getAllMealPlans);

// Get meal plan by ID
router.get("/:id", authenticate, getMealPlanById);

// Get meal plans by fitness goal
router.get(
  "/goal/:goal",
  authenticate,
  getMealPlansForGoal
);

// =========================
// Admin Only Routes
// =========================

// Create meal plan
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createMealPlanHandler
);

// Update meal plan
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateMealPlanHandler
);

// Delete meal plan
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteMealPlanHandler
);

export default router;