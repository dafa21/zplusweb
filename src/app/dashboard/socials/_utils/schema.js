import { z } from "zod";

export const socialSchema = z.object({
  type: z.string("Social media is required"),
  value: z.string("Value is required"),
  link: z.string().optional(),
});
