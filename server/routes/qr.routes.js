import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { generateQRCode, getMyQRCodes } from "../controllers/qr.controller.js";

const router = express.Router();

router.post(
  "/generate",
  authenticate,
  authorize("MEMBER"),
  generateQRCode
);

router.get(
  "/my",
  authenticate,
  authorize("MEMBER"),
  getMyQRCodes
);

export default router;
