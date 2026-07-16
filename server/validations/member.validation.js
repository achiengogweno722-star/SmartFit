import { z } from "zod";

export const memberProfileSchema = z.object({
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),

  // Accept YYYY-MM-DD
  dateOfBirth: z.string().date(),

  height: z
    .number()
    .positive("Height must be greater than 0"),

  weight: z
    .number()
    .positive("Weight must be greater than 0"),

  fitnessLevel: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),

  fitnessGoal: z.enum([
    "WEIGHT_LOSS",
    "MUSCLE_GAIN",
    "STRENGTH",
    "ENDURANCE",
    "GENERAL_FITNESS",
  ]),

  medicalConditions: z.string().optional(),

  phoneNumber: z.string().optional(),

  address: z.string().optional(),

  emergencyContact: z.string().optional(),

  // New field
  availableDaysPerWeek: z
    .number()
    .int("Available days must be a whole number.")
    .min(1, "Minimum is 1 day.")
    .max(7, "Maximum is 7 days."),
});

// Update Member Profile Schema
export const updateMemberProfileSchema =
  memberProfileSchema.partial();