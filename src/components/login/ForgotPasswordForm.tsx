import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle, Send, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { resetPassword } from "@/services/supabase/auth-service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onCancel: () => void;
  isLoading: boolean;
}

const ForgotPasswordForm = ({
  onCancel,
  isLoading: externalLoading,
}: ForgotPasswordFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(externalLoading);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      const { success, error } = await resetPassword(data.email);
      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Reset link sent!",
          description: "Check your email for password reset instructions.",
        });
        
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Failed to send reset link. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2"
        >
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#E0AAFF] to-[#C77DFF] bg-clip-text text-transparent">
            Reset Your Password
          </h2>
          <p className="text-[#E0AAFF] dark:text-[#C77DFF] text-sm">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-8 space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E0AAFF]/20 to-[#C77DFF]/20 blur-xl" />
                <CheckCircle className="h-16 w-16 text-[#9D4EDD] relative z-10" />
              </motion.div>
              <p className="text-[#E0AAFF] dark:text-[#C77DFF] text-center">
                Password reset link has been sent to your email. Please check your inbox.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto border-[#E0AAFF]/30 text-[#9D4EDD] hover:bg-[#9D4EDD]/10
                         dark:border-[#9D4EDD]/30 dark:text-[#E0AAFF] dark:hover:bg-[#9D4EDD]/20
                         transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Login
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[#240046] dark:text-white text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#9D4EDD]" />
                      Email
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/50 dark:border-0 
                                   text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                                   h-11 py-2 pl-4 focus-visible:ring-[#9D4EDD]"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="w-full sm:w-1/2 border-[#E0AAFF]/30 text-[#9D4EDD] hover:bg-[#9D4EDD]/10
                           dark:border-[#9D4EDD]/30 dark:text-[#E0AAFF] dark:hover:bg-[#9D4EDD]/20
                           transition-all duration-300 group"
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-1/2 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white
                           transition-all duration-300 group relative overflow-hidden"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Send Reset Link
                    </div>
                  )}
                </Button>
              </div>

              <div className="pt-4 border-t border-[#E0AAFF]/20 dark:border-[#9D4EDD]/20">
                <div className="flex items-center gap-2 text-xs text-[#9D4EDD]/70 dark:text-[#E0AAFF]/70">
                  <Shield className="h-4 w-4" />
                  <span>Protected by reCAPTCHA</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
