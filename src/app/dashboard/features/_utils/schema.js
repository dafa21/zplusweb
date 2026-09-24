import { z } from "zod";
import { imageSchema } from "@/lib/schema";

export const sectionSchema = z.object({
  title: z
    .string("Title is required")
    .min(2, "Title must have at least 2 characters"),
});

export const featureSchema = z.object({
  image: imageSchema,
  title: z
    .string("Title is required")
    .min(2, "Title must have at least 2 characters"),
  description: z
    .string("Title is required")
    .min(2, "Title must have at least 2 characters"),
});
