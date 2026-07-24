import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  createAppointment,
  getMemberAppointments,
  getTrainerAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("MEMBER"),
  createAppointment
);

router.get(
  "/member",
  authenticate,
  authorize("MEMBER"),
  getMemberAppointments
);

router.get(
  "/trainer",
  authenticate,
  authorize("TRAINER"),
  getTrainerAppointments
);

router.put(
  "/:appointmentId/status",
  authenticate,
  authorize("TRAINER", "ADMIN"),
  updateAppointmentStatus
);

export default router;
