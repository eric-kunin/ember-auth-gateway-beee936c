
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

// Schema for step 2 - Personal information
export const personalInfoFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  gender: z.string().min(1, "Please select a gender"),
  birthdate: z.date({
    required_error: "Please select a date of birth",
  }),
  phone: z.string().optional(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

// Schema for step 3 - Additional Information (if needed in the future)
// export const additionalInfoFormSchema = z.object({});
// export type AdditionalInfoFormValues = z.infer<typeof additionalInfoFormSchema>;
