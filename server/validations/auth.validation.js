import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),

  role: z.enum(["ADMIN", "TRAINER", "MEMBER"]).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});