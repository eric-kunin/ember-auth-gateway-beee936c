
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
  Other = 'other'
}

export enum Religion {
  Jewish = 'jewish',
  Christian = 'christian',
  Catholic = 'catholic',
  Protestant = 'protestant',
  Orthodox = 'orthodox',
  Muslim = 'muslim',
  Hindu = 'hindu',
  Buddhist = 'buddhist',
  Sikh = 'sikh',
  Spiritual = 'spiritual but not religious',
  Atheist = 'atheist',
  Agnostic = 'agnostic',
  Other = 'other',
  PreferNotToSay = 'prefer not to say'
}

export enum ReligiousLevel {
  NotReligious = 'not religious',
  SomewhatReligious = 'somewhat religious',
  ModeratelyReligious = 'moderately religious',
  VeryReligious = 'very religious',
  Orthodox = 'orthodox'
}

export enum SmokingStatus {
  NonSmoker = 'non-smoker',
  Occasional = 'occasional',
  Regular = 'regular',
  Quitting = 'trying to quit'
}

export enum DrinkingStatus {
  NonDrinker = 'non-drinker',
  Social = 'social',
  Regular = 'regular'
}

export enum LookingFor {
  Friendship = 'friendship',
  CasualDating = 'casual dating',
  SeriousRelationship = 'serious relationship',
  LongTermRelationship = 'long-term relationship',
  Marriage = 'marriage'
}

export enum LookingForGender {
  Male = 'Male',
  Female = 'Female',
  Both = 'Both',
  Other = 'Other'
}

export enum UserRole {
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin'
}

// Helper type for working with Supabase responses
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
