import { z } from "zod";

export const membershipSchema = z.object({
  amount: z.number().positive(),
  durationDays: z.number().int().positive().optional(),
  currency: z.string().optional(),
  description: z.string().optional(),
  transactionId: z.string().optional(),
});
