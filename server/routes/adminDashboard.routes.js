import express from "express";
import { getDashboard } from "../controllers/adminDashboard.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin Dashboard
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getDashboard
);

export default router;