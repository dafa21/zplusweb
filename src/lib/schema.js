import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imageSchema = z
  .any()
  .refine((files) => files?.length > 0, "Image is required")
  .refine((files) => {
    if (typeof files === "string") return true;

    return files?.[0]?.size <= MAX_FILE_SIZE;
  }, `Image must be smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB`)
  .refine((files) => {
    if (typeof files === "string") return true;

    return [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ].includes(files?.[0]?.type);
  }, "Only .jpg, .jpeg, .png, .webp, and .svg formats are supported");
