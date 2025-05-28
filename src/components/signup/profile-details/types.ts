
import { z } from "zod";

export const profileDetailsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().optional(),
  profession: z.string().optional(),
});

export type ProfileDetailsFormValues = z.infer<typeof profileDetailsSchema>;
