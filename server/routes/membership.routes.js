import express from "express";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";
import {
  subscribeMembership,
  getMyMembership,
  getAllMemberships,
} from "../controllers/membership.controller.js";

const router = express.Router();

router.post(
  "/subscribe",
  authenticate,
  authorize("MEMBER"),
  subscribeMembership
);

router.get(
  "/my",
  authenticate,
  authorize("MEMBER"),
  getMyMembership
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "TRAINER"),
  getAllMemberships
);

export default router;
