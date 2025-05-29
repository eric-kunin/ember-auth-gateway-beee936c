
export interface ProfileData {
  name?: string;
  gender?: "Male" | "Female" | "Other";
  birthdate?: Date;
  phone?: string;
  preferences?: Record<string, any>;
  username?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string; // Add nickname field
  bio?: string;
  profession?: string;
  height?: number;
  eyeColor?: string;
  religion?: string;
  religiousLevel?: string;
  smokingStatus?: string;
  drinkingStatus?: string;
  lookingFor?: string;
  lookingForGender?: "Male" | "Female" | "Other" | "Both";
}

// Add this type for compatibility with the Supabase profile format
export interface SupabaseProfileData {
  bio?: string;
  birth_date?: string;
  body_type?: "athletic" | "average" | "slim" | "curvy" | "muscular" | "prefer not to say" | "keep it secret" | "other";
  created_at?: string;
  display_name?: string;
  drinking?: string;
  education?: string;
  email?: string;
  ethnicity?: string;
  eye_color?: string;
  first_name?: string;
  gender?: "Male" | "Female" | "Other";
  hair_color?: string;
  height?: number;
  id?: string;
  income?: string;
  interests?: string[];
  last_name?: string;
  looking_for?: string;
  looking_for_gender?: "Male" | "Female" | "Other" | "Both";
  name?: string;
  occupation?: string;
  phone?: string;
  profile_photo_url?: string;
  religion?: string;
  religious_level?: string;
  smoking?: string;
  updated_at?: string;
  username?: string;
}
