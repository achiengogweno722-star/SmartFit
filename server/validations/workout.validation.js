import { z } from "zod";

export const workoutSchema = z.object({
  name: z
    .string()
    .min(3, "Workout name must be at least 3 characters."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),

  category: z
    .string()
    .min(3, "Category is required."),

  targetGoal: z.enum([
    "WEIGHT_LOSS",
    "MUSCLE_GAIN",
    "STRENGTH",
    "ENDURANCE",
    "GENERAL_FITNESS",
  ]),

  difficulty: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),

  duration: z
    .number()
    .int()
    .positive("Duration must be greater than 0."),

  calories: z
    .number()
    .int()
    .positive("Calories must be greater than 0."),

  equipmentRequired: z.boolean(),

  sessionsPerWeek: z
    .number()
    .int()
    .min(1, "Sessions per week must be at least 1.")
    .max(7, "Sessions per week cannot exceed 7."),

  estimatedWeeks: z
    .number()
    .int()
    .positive("Estimated weeks must be greater than 0."),

  isActive: z.boolean().optional().default(true),
});

export const updateWorkoutSchema = workoutSchema.partial();