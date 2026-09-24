import { z } from "zod";
import { imageSchema } from "@/lib/schema";

export const sectionSchema = z.object({
  title: z
    .string("Title is required")
    .min(2, "Title must have at least 2 characters"),
});

export const testimonySchema = z.object({
  image: imageSchema,
  name: z
    .string("Name is required")
    .min(2, "Name must have at least 2 characters"),
  description: z
    .string("Description is required")
    .min(2, "Description must have at least 2 characters"),
  institution: z
    .string("Institution is required")
    .min(2, "Institution must have at least 2 characters"),
});
