import { imageSchema } from "@/lib/schema";
import { z } from "zod";

export const formSchema = z.object({
  favicon: imageSchema,
  logo: imageSchema,
  name: z
    .string("Name is required")
    .min(2, "Name must have at least 2 characters"),
  description: z
    .string("Description is required")
    .min(2, "Description must have at least 2 characters"),
  address: z
    .string("Address is required")
    .min(2, "Address must have at least 2 characters"),
  email: z.email("Email is not valid"),
  phone_number: z
    .string("Phone number is required")
    .min(2, "Phone number must have at least 2 characters"),
});
