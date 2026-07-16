import { trainerProfileSchema } from "../validations/trainer.validation.js";
import {
  createTrainerProfile,
  getAllTrainers,
} from "../services/trainer.service.js";

// Create Trainer Profile
export const createTrainer = async (req, res) => {
  try {
    const validatedData = trainerProfileSchema.parse(req.body);

    const trainer = await createTrainerProfile(
      req.user.id,
      validatedData
    );

    res.status(201).json({
      success: true,
      message: "Trainer profile created successfully.",
      trainer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await getAllTrainers();

    res.status(200).json({
      success: true,
      count: trainers.length,
      trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};