import { z } from "zod";

export const sectionSchema = z.object({
  title: z
    .string("Title is required")
    .min(2, "Title must have at least 2 characters"),
});

export const credibilitySchema = z.object({
  total: z
    .string("Total is required")
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Total must be greater than 0" }),
  description: z
    .string("Description is required")
    .min(2, "Description must have at least 2 characters"),
});
