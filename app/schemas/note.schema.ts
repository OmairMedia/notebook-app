import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(2, "Title must be at least 2 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .max(1000, "You can write max 1000 characters"),
});
