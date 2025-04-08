
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountFormSchema, AccountFormValues } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
    agreeToTerms: false
  },
  isLoading,
  onSubmit
}: SignupFormProps) => {
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange"
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
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
                    placeholder="name@example.com"
                    type="email"
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                             pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    title="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 absolute mt-2 block pb-2" />
              </div>
              {/* Add extra space to accommodate error messages */}
              <div className="h-5"></div>
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
                    type={showPassword ? "text" : "password"}
                    placeholder="password123"
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                             pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    title="Enter a password with at least 8 characters, including an uppercase letter and a number"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD] dark:text-[#9D4EDD] hover:text-[#7B2CBF] dark:hover:text-[#C77DFF] transition-colors duration-300"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <FormMessage className="text-xs text-red-500 absolute mt-2 block pb-2" />
              </div>
              <p className="text-xs text-[#3B185F]/70 dark:text-custom-lighter/70 mt-2 pt-4">
                Password must be at least 8 characters, include an uppercase letter and a number.
              </p>
              {/* Add extra space to accommodate error messages */}
              <div className="h-5"></div>
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
                    type={showPassword ? "text" : "password"}
                    placeholder="password123"
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                             pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    title="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD] dark:text-[#9D4EDD] hover:text-[#7B2CBF] dark:hover:text-[#C77DFF] transition-colors duration-300"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <FormMessage className="text-xs text-red-500 absolute mt-2 block pb-2" />
              </div>
              {/* Add extra space to accommodate error messages */}
              <div className="h-5"></div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20 p-4 bg-[#f8f2ff]/50 dark:bg-[#240046]/40">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-[#9D4EDD] data-[state=checked]:border-[#9D4EDD]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-[#3B185F] dark:text-custom-lighter cursor-pointer">
                  I agree to the <a href="#" className="text-[#9D4EDD] underline">Terms of Service</a> and <a href="#" className="text-[#9D4EDD] underline">Privacy Policy</a>
                </FormLabel>
                <FormMessage className="text-xs text-red-500 mt-2 block" />
              </div>
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-12
                   signin-button-hover transition-all duration-300"
          disabled={isLoading}
          title="Create your account"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
