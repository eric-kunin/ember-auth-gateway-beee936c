
import { z } from "zod";

export const profileDetailsSchema = z.object({
  bio: z.string().optional(),
  profession: z.string().optional(),
  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be at most 250 cm").optional().or(z.literal('')),
  eyeColor: z.string().optional(),
  religion: z.string().optional(),
  religiousLevel: z.string().optional(),
  smokingStatus: z.string().optional(),
  drinkingStatus: z.string().optional(),
  lookingFor: z.string().optional(),
  lookingForGender: z.string().optional()
});

export type ProfileDetailsFormValues = z.infer<typeof profileDetailsSchema>;
