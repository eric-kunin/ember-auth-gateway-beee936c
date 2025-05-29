
import { z } from "zod";

// Schema for step 1 - Account details
export const accountFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

// Schema for step 2 - Personal information (nickname, username, gender only)
export const personalInfoFormSchema = z.object({
  nickname: z.string()
    .min(2, "Nickname must be at least 2 characters")
    .max(15, "Nickname must be 15 characters or less"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be 15 characters or less")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  gender: z.string().min(1, "Please select a gender"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

// Schema for step 3 - Birth date
export const birthdateFormSchema = z.object({
  birthdate: z.date({
    required_error: "Please select a date of birth",
  }),
});

export type BirthdateFormValues = z.infer<typeof birthdateFormSchema>;
