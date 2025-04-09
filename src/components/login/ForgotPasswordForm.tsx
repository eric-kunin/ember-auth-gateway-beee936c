
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <h2 className="text-lg font-semibold text-white mb-4">Reset Your Password</h2>
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 
                }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              </motion.div>
              <p className="text-white text-center mb-6">
                Password reset link has been sent to your email. Please check your inbox.
              </p>
              <Button
                type="button"
                variant="outline"
                className="border border-[#E0AAFF] text-white hover:bg-[#9D4EDD]/20"
                onClick={onCancel}
              >
                Return to Login
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-[#E0AAFF] text-sm mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-white text-sm">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70" />
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          className="bg-[#240046]/50 border border-[#E0AAFF]/30 
                                 text-white placeholder:text-[#E0AAFF]/60
                                 pl-10 h-11 sm:h-12 py-2 focus-visible:ring-[#9D4EDD]"
                          disabled={isLoading}
                          title="Enter the email associated with your account"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-3 mt-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-1/2"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border border-[#E0AAFF]/50 text-white hover:bg-[#9D4EDD]/20 h-12 group"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-1/2"
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
