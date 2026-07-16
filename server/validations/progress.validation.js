import { z } from "zod";

export const progressSchema = z.object({
  weight: z
    .number()
    .positive("Weight must be greater than 0."),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});