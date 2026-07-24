import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  getMyNotifications,
  markNotificationRead,
  createNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/my", authenticate, authorize("MEMBER"), getMyNotifications);
router.put(
  "/:notificationId/read",
  authenticate,
  authorize("MEMBER"),
  markNotificationRead
);
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  createNotification
);

export default router;
