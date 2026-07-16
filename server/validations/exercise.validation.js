import { z } from "zod";

export const exerciseSchema = z.object({
  workoutPlanId: z.number().int().positive(),

  name: z
    .string()
    .min(3, "Exercise name must be at least 3 characters."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),

  sets: z
    .number()
    .int()
    .positive("Sets must be greater than 0."),

  reps: z
    .number()
    .int()
    .positive()
    .optional(),

  durationSeconds: z
    .number()
    .int()
    .positive()
    .optional(),

  restSeconds: z
    .number()
    .int()
    .min(0),

  difficulty: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),
});

export const updateExerciseSchema =
  exerciseSchema.partial();