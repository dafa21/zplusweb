import { z } from "zod";
import { imageSchema } from "@/lib/schema";

export const memberSchema = z.object({
  image: imageSchema,
  name: z
    .string("Name is required")
    .min(2, "Name must have at least 2 characters"),
  role: z
    .string("Role is required")
    .min(2, "Role must have at least 2 characters"),
});
