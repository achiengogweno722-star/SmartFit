import { z } from "zod";

export const appointmentSchema = z.object({
  trainerId: z.number().int().positive(),
  scheduledAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "ScheduledAt must be a valid date string.",
  }),
  notes: z.string().optional(),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});
