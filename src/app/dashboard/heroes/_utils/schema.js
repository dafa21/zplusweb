import { z } from "zod";
import { imageSchema } from "@/lib/schema";

export const heroSchema = z.object({
  imageDesktop: imageSchema,
  imageMobile: imageSchema,
  title: z
    .string("Title is required")
    .min(2, "Title must have at least 2 characters"),
  description: z
    .string("Description is required")
    .min(2, "Description must have at least 2 characters"),
});
