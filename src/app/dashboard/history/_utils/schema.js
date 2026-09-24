import { z } from "zod";

export const formSchema = z.object({
  history: z
    .string("History is required")
    .min(2, "History must have at least 2 characters"),
});
