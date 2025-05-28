
import { z } from "zod";

export const profileDetailsSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  profession: z.string().optional(),
  height: z.number().optional(),
  eyeColor: z.string().optional(),
  religion: z.string().optional(),
  religiousLevel: z.string().optional(),
  smokingStatus: z.string().optional(),
  drinkingStatus: z.string().optional(),
  lookingFor: z.string().optional(),
  lookingForGender: z.string().optional(),
});

export type ProfileDetailsFormValues = z.infer<typeof profileDetailsSchema>;
