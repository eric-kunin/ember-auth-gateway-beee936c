
import { Database } from '@/integrations/supabase/types';

// Profile types based on the data structure you're working with
export type Profile = {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  birth_date: Date | string;
  gender: Gender;
  bio?: string;
  profession?: string;
  eye_color?: EyeColor;
  height?: number;
  religion?: Religion;
  religious_level?: ReligiousLevel;
  smoking_status?: SmokingStatus;
  drinking_status?: DrinkingStatus;
  looking_for?: LookingFor;
  looking_for_gender?: LookingForGender;
  user_role?: UserRole;
  is_online?: boolean;
  last_seen_at?: Date | string;
};

// Type for signup form submission
export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  name: string;
  gender: string;
  birthdate: Date;
  phone?: string;
  bio?: string;
  profession?: string;
  eyeColor?: string;
  height?: number;
  religion?: string;
  religiousLevel?: string;
  smokingStatus?: string;
  drinkingStatus?: string;
  lookingFor?: string;
  lookingForGender?: string;
  languageIds?: number[];
  locationId?: string;
};

// Enums based on your database structure
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum EyeColor {
  Brown = 'brown',
  Blue = 'blue',
  Green = 'green',
  Hazel = 'hazel',
  Gray = 'gray',
  Other = 'other'
}

export enum Religion {
  Orthodox = 'orthodox',
  Conservative = 'conservative',
  Reform = 'reform',
  Secular = 'secular',
  Traditional = 'traditional',
  Other = 'other'
}

export enum ReligiousLevel {
  NotReligious = 'not religious',
  SomewhatReligious = 'somewhat religious',
  Religious = 'religious',
  VeryReligious = 'very religious'
}

export enum SmokingStatus {
  NonSmoker = 'non-smoker',
  Occasional = 'occasional',
  Regular = 'regular',
  Quitting = 'quitting'
}

export enum DrinkingStatus {
  NonDrinker = 'non-drinker',
  Social = 'social',
  Regular = 'regular',
  Rarely = 'rarely'
}

export enum LookingFor {
  SeriousRelationship = 'serious relationship',
  Casual = 'casual',
  Friendship = 'friendship',
  Marriage = 'marriage'
}

export enum LookingForGender {
  Male = 'Male',
  Female = 'Female',
  Both = 'Both'
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator'
}

// Helper type for working with Supabase responses
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
