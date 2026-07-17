import { z } from "zod";

export const mealPlanSchema = z.object({
  name: z
    .string()
    .min(3, "Meal plan name must be at least 3 characters."),

  goal: z.enum([
    "WEIGHT_LOSS",
    "MUSCLE_GAIN",
    "STRENGTH",
    "ENDURANCE",
    "GENERAL_FITNESS",
  ]),

  calories: z
    .number()
    .int()
    .positive("Calories must be greater than 0."),

  breakfast: z
    .string()
    .min(3, "Breakfast is required."),

  lunch: z
    .string()
    .min(3, "Lunch is required."),

  dinner: z
    .string()
    .min(3, "Dinner is required."),

  snacks: z
    .string()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export const updateMealPlanSchema = mealPlanSchema.partial();