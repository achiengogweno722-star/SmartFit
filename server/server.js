import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import memberRoutes from "./routes/member.routes.js";
import trainerRoutes from "./routes/trainer.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import workoutLogRoutes from "./routes/workoutLog.routes.js";
import adminDashboardRoutes from "./routes/adminDashboard.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/workout-logs", workoutLogRoutes);
app.use("/api/dashboard", adminDashboardRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartFit API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SmartFit Server running on http://localhost:${PORT}`);
});