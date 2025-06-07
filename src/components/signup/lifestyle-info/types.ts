
export interface Lifestyle1FormValues {
  height?: number | "";
  eyeColor?: string;
  religion?: string;
  religiousLevel?: string;
  hobbies?: string[];
}

export interface Lifestyle2FormValues {
  smokingStatus?: string;
  drinkingStatus?: string;
  lookingFor?: string;
  lookingForGender?: string;
  hobbies?: string[];
  pets?: string;
  exercise?: string;
  diet?: string;
}

export interface LifestyleFormValues extends Lifestyle1FormValues, Lifestyle2FormValues {}
