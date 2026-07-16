import { z } from "zod";

export const trainerProfileSchema = z.object({
  specialization: z
    .string()
    .min(3, "Specialization must be at least 3 characters long"),

  experience: z
    .number()
    .int()
    .min(0, "Experience cannot be negative"),

  phoneNumber: z
    .string()
    .optional(),
});