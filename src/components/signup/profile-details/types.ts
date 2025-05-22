
import { z } from "zod";

// Schema for profile details (now with just bio and profession)
export const profileDetailsSchema = z.object({
  bio: z.string().optional(),
  profession: z.string().optional()
});

export type ProfileDetailsFormValues = z.infer<typeof profileDetailsSchema>;

// Export types for proper type checking in the SignupSummary component
export interface ProfileDetails extends ProfileDetailsFormValues {
  languageIds?: number[];
}
