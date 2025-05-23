
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Info } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { accountFormSchema, AccountFormValues } from "./schemas";
import { useState } from "react";
import TermsNotice from "./TermsNotice";
import ValidationIcon from "./ValidationIcon";

interface SignupFormProps {
  defaultValues?: Partial<AccountFormValues>;
  isLoading: boolean;
  onSubmit: (data: AccountFormValues) => void;
}

const SignupForm = ({
  defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  },
  isLoading,
  onSubmit,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange"
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Get form states for validation feedback
  const emailState = form.getFieldState("email");
  const passwordState = form.getFieldState("password");
  const confirmPasswordState = form.getFieldState("confirmPassword");
  
  const emailValue = form.watch("email");
  const passwordValue = form.watch("password");
  const confirmPasswordValue = form.watch("confirmPassword");
  
  const emailIsValid = emailValue && !emailState.invalid && emailState.isDirty;
  const passwordIsValid = passwordValue && !passwordState.invalid && passwordState.isDirty;
  const confirmPasswordIsValid = confirmPasswordValue && !confirmPasswordState.invalid && confirmPasswordState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Email
              </FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    type="email"
                    className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                              text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                              pl-10 pr-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                              ${emailState.invalid && emailState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                              ${emailIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <ValidationIcon isValid={emailIsValid} showIcon={emailState.isDirty} />
              </div>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Password
              </FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                              text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                              pl-10 pr-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                              ${passwordState.invalid && passwordState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                              ${passwordIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD]/70 dark:text-custom-lighter/70 hover:text-[#9D4EDD] dark:hover:text-white transition-colors"
                  onClick={toggleShowPassword}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="text-xs text-[#3B185F]/70 dark:text-custom-lighter/70 flex items-start space-x-1">
                <Info className="h-3 w-3 mt-0.5 shrink-0" />
                <span>Password must have at least 8 characters with one uppercase letter and one number.</span>
              </div>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Confirm Password
              </FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                              text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                              pl-10 pr-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                              ${confirmPasswordState.invalid && confirmPasswordState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                              ${confirmPasswordIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD]/70 dark:text-custom-lighter/70 hover:text-[#9D4EDD] dark:hover:text-white transition-colors"
                  onClick={toggleShowConfirmPassword}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />
        
        <div className="pt-2">
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-[#9D4EDD] data-[state=checked]:border-[#9D4EDD] border-[#9D4EDD]/30 mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">
                    I agree to the
                    <button
                      type="button"
                      className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white ml-1 underline decoration-1 underline-offset-2"
                      onClick={() => {
                        // Open terms dialog
                      }}
                    >
                      Terms of Service
                    </button>
                  </FormLabel>
                  <div className="h-5 min-h-[1.25rem]">
                    <FormMessage className="text-xs text-red-500" />
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                 signin-button-hover transition-all duration-300"
          disabled={isLoading || !form.formState.isValid}
          title="Continue to next step"
        >
          Next
        </Button>
        
        <TermsNotice />
      </form>
    </Form>
  );
};

export default SignupForm;
