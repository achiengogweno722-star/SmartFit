import express from "express";

import {
  createProgressLog,
  getProgressLogs,
} from "../controllers/progress.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add Progress Log
router.post("/", authenticate, createProgressLog);

// Get Progress History
router.get("/", authenticate, getProgressLogs);

export default router;