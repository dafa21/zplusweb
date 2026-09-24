import { z } from "zod";
import { imageSchema } from "@/lib/schema";

export const clientSchema = z.object({
  image: imageSchema,
  name: z
    .string("Name is required")
    .min(2, "Name must have at least 2 characters"),
  description: z
    .string("Description is required")
    .min(2, "Description must have at least 2 characters"),
});
