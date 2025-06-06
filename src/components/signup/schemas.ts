
import { z } from "zod";
import i18n from "@/i18n";

// Helper function to get translated validation messages
const getValidationMessage = (key: string, params?: Record<string, any>) => {
  return i18n.t(`validation.${key}`, params);
};

// Schema for step 1 - Account details
export const accountFormSchema = z.object({
  email: z.string().email(getValidationMessage("email.invalid")),
  password: z
    .string()
    .min(8, getValidationMessage("password.min", { min: 8 }))
    .regex(/[A-Z]/, getValidationMessage("password.uppercase"))
    .regex(/[0-9]/, getValidationMessage("password.number")),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: getValidationMessage("terms.required")
  })
}).refine(data => data.password === data.confirmPassword, {
  message: getValidationMessage("confirmPassword.match"),
  path: ["confirmPassword"]
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

// Schema for step 2 - Personal information (nickname, username, gender only)
export const personalInfoFormSchema = z.object({
  nickname: z.string()
    .min(2, getValidationMessage("nickname.min", { min: 2 }))
    .max(15, getValidationMessage("nickname.max", { max: 15 })),
  username: z.string()
    .min(3, getValidationMessage("username.min", { min: 3 }))
    .max(15, getValidationMessage("username.max", { max: 15 }))
    .regex(/^[a-zA-Z0-9_]+$/, getValidationMessage("username.pattern")),
  gender: z.string().min(1, getValidationMessage("gender.required")),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

// Schema for step 3 - Birth date
export const birthdateFormSchema = z.object({
  birthdate: z.date({
    required_error: "Please select a date of birth",
  }),
});

export type BirthdateFormValues = z.infer<typeof birthdateFormSchema>;
