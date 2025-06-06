
import { z } from "zod";
import { TFunction } from "i18next";

// Factory function to create schemas with proper translations
export const createPersonalInfoSchema = (t: TFunction) => {
  return z.object({
    nickname: z.string()
      .min(2, t("validation.nickname.min", { min: 2 }))
      .max(15, t("validation.nickname.max", { max: 15 })),
    username: z.string()
      .min(3, t("validation.username.min", { min: 3 }))
      .max(15, t("validation.username.max", { max: 15 }))
      .regex(/^[a-zA-Z0-9_]+$/, t("validation.username.pattern")),
    gender: z.string().min(1, t("validation.gender.required")),
  });
};

export const createAccountSchema = (t: TFunction) => {
  return z.object({
    email: z.string().email(t("validation.email.invalid")),
    password: z
      .string()
      .min(8, t("validation.password.min", { min: 8 }))
      .regex(/[A-Z]/, t("validation.password.uppercase"))
      .regex(/[0-9]/, t("validation.password.number")),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: t("validation.terms.required")
    })
  }).refine(data => data.password === data.confirmPassword, {
    message: t("validation.confirmPassword.match"),
    path: ["confirmPassword"]
  });
};
