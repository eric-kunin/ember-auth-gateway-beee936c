
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginFormSchema, LoginFormValues } from "./schemas";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isLoading: boolean;
  defaultValues?: Partial<LoginFormValues>;
  onForgotPassword: () => void;
}

const LoginForm = ({
    
  onSubmit,
  isLoading,
  onForgotPassword,
  defaultValues = {
    email: "",
    password: "",
    rememberMe: false
  }
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    const direction = isHebrew ? "rtl" : "ltr";
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                  {t("email")}
                </FormLabel>
                <div className="relative">
                  { direction === "rtl" ? (<>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormControl>
                        <Input
                          placeholder={t("emailPlaceholder")}
                          autoComplete="email"
                          type="email"
                          className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD] pr-[40px]"
                          disabled={isLoading}
                          title={t("emailTooltip")}
                          aria-label={t("emailLabel") || "Email"}
                          {...field}
                        />
                      </FormControl>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-[#9D4EDD] text-white border-[#E0AAFF]">
                      {t("enterEmail")}
                    </TooltipContent>
                  </Tooltip>
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                  </>) : (<>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormControl>
                        <Input 
                        placeholder={t("emailPlaceholder")} 
                        autoComplete="email" 
                        type="email" 
                        className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 
                                    text-[#240046] dark:text-white  
                                    placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                                    h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD] ${
                                        isHebrew ? "pr-10 pl-[6px]" : "pl-[42px] pr-[6px]"
                                    }`} 
                        disabled={isLoading}
                        title={t("emailTooltip")}
                        aria-label={t("emailLabel") || "Email"}
                        {...field}
                        />
                      </FormControl>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-[#9D4EDD] text-white border-[#E0AAFF]">
                      {t("enterEmail")}
                    </TooltipContent>
                  </Tooltip>
                  </>)}
                </div>
                <div className="h-6">
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center flex-wrap">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                    {t("password")}
                  </FormLabel>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs text-[#9D4EDD] dark:text-custom-lighter hover:text-[#7B2CBF] dark:hover:text-white transition-colors duration-300"
                    onClick={onForgotPassword}
                  >
                    {t("forgotPassword")}
                  </motion.button>
                </div>
                <div className="relative">
                    {direction === "rtl" ? (
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FormControl>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t("passwordPlaceholder") || "password123"}
                                            autoComplete="current-password"
                                            className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 
                                                text-[#240046] dark:text-white  
                                                placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                                                h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD] pr-10 pl-[6px]`}
                                            disabled={isLoading}
                                            title={t("passwordTooltip")}
                                            aria-label={t("passwordLabel") || "Password"}
                                            {...field}
                                        />
                                    </FormControl>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-[#9D4EDD] text-white border-[#E0AAFF]">
                                    {t("tooltipContentPassword")}
                                </TooltipContent>
                            </Tooltip>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9D4EDD] dark:text-[#9D4EDD] hover:text-[#7B2CBF] dark:hover:text-[#C77DFF] text-xs font-medium transition-colors duration-300"
                                title={showPassword ? t("hidePassword") : t("showPassword")}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 opacity-70 hover:opacity-100" />
                                ) : (
                                    <Eye className="h-5 w-5 opacity-70 hover:opacity-100" />
                                )}
                            </button>
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                        </>
                    ) : (
                        <>
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FormControl>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t("passwordPlaceholder") || "password123"}
                                            autoComplete="current-password"
                                            className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 
                                                text-[#240046] dark:text-white  
                                                placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                                                h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD] pl-10 pr-[40px]`}
                                            disabled={isLoading}
                                            title={t("passwordTooltip")}
                                            aria-label={t("passwordLabel") || "Password"}
                                            {...field}
                                        />
                                    </FormControl>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-[#9D4EDD] text-white border-[#E0AAFF]">
                                    {t("tooltipContentPassword")}
                                </TooltipContent>
                            </Tooltip>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD] dark:text-[#9D4EDD] hover:text-[#7B2CBF] dark:hover:text-[#C77DFF] text-xs font-medium transition-colors duration-300"
                                title={showPassword ? t("hidePassword") : t("showPassword")}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 opacity-70 hover:opacity-100" />
                                ) : (
                                    <Eye className="h-5 w-5 opacity-70 hover:opacity-100" />
                                )}
                            </button>
                        </>
                    )}
                </div>
                <div className="h-6">
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-[#9D4EDD] data-[state=checked]:border-[#9D4EDD]"
                    title={t("rememberMe")}
                  />
                </FormControl>
                <div className="space-y-0.5">
                  <FormLabel className="text-xs sm:text-sm text-[#3B185F] dark:text-custom-lighter transition-colors duration-300 cursor-pointer pr-3">
                    {t("rememberMe")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              type="submit"
              className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-12
                     signin-button-hover transition-all duration-300 group"
              disabled={isLoading}
              title={t("signInTitle")}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                  <span>{t("signingIn")}</span>
                </div>
              ) : (
                direction === "rtl" ? (
                  <>
                    <div className="flex items-center justify-center w-full">
                      <span>{t("signIn")}</span>
                      <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-full">
                      <span>{t("signIn")}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </>
                )
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </TooltipProvider>
  );
};

export default LoginForm;
