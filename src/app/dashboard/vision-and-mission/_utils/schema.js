import { z } from "zod";

export const formSchema = z.object({
  vision: z
    .string("Vision is required")
    .min(2, "Vision must have at least 2 characters"),
  mission: z
    .string("Mission is required")
    .min(2, "Mission must have at least 2 characters"),
});
