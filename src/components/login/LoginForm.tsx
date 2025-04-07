
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock } from "lucide-react";
import { loginFormSchema, LoginFormValues } from "./schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isLoading: boolean;
  defaultValues?: Partial<LoginFormValues>;
}

const LoginForm = ({
  onSubmit,
  isLoading,
  defaultValues = {
    email: "",
    password: "",
    rememberMe: false
  }
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
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
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 
                            text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                            pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  Password
                </FormLabel>
                <a href="#" className="text-xs text-[#9D4EDD] dark:text-custom-lighter hover:text-[#7B2CBF] dark:hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password123"
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 
                            text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                            pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD] dark:text-[#9D4EDD] hover:text-[#7B2CBF] dark:hover:text-[#C77DFF] text-xs font-medium transition-colors duration-300"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-[#9D4EDD]"
                />
              </FormControl>
              <div className="space-y-0.5">
                <FormLabel htmlFor="remember-me" className="text-xs sm:text-sm text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">
                  Remember me for 30 days
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                 signin-button-hover transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
