import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  charityId: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const scoreSchema = z.object({
  value: z.number().min(1).max(45),
});

export const charitySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  logoUrl: z.string().url().optional(),
  website: z.string().url().optional(),
});
