import express from "express";
import { adminDashboard } from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin-only route
router.get("/dashboard", authenticate, authorize("ADMIN"), adminDashboard);

export default router;