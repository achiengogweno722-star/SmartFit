import {
  addProgressLog,
  getProgressHistory,
} from "../services/progress.service.js";

import { progressSchema } from "../validations/progress.validation.js";

// Add Progress Log
export const createProgressLog = async (req, res) => {
  try {
    // Validate request body
    const validatedData = progressSchema.parse(req.body);

    // Save progress log
    const progress = await addProgressLog(
      req.user.id,
      validatedData
    );

    res.status(201).json({
      success: true,
      message: "Progress logged successfully.",
      progress,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Progress History
export const getProgressLogs = async (req, res) => {
  try {
    const progress = await getProgressHistory(req.user.id);

    res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};