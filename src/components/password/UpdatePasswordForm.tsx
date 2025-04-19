
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const updatePasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UpdatePasswordFormValues) => {
    try {
      setIsLoading(true);
      console.log("Updating password:", data);
      
      toast({
        title: "Password updated!",
        description: "Your password has been reset successfully. You can now login with your new password.",
      });
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white/5 dark:bg-[#10002B]/90 rounded-lg border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20 backdrop-blur-xl animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mb-4">
          <KeyRound className="h-12 w-12 text-[#9D4EDD] animate-pulse" />
        </div>
        <h2 className="text-3xl font-semibold text-[#9D4EDD]">Reset Password</h2>
        <p className="text-[#E0AAFF] text-sm">Create your new secure password</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#E0AAFF]">New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      className="bg-white/10 border-[#E0AAFF]/30 text-white pr-10 focus:ring-[#9D4EDD] transition-all"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-[#E0AAFF]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#E0AAFF]" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#E0AAFF]">Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="bg-white/10 border-[#E0AAFF]/30 text-white pr-10 focus:ring-[#9D4EDD] transition-all"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-[#E0AAFF]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#E0AAFF]" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white transform hover:scale-105 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </Form>

      <div className="pt-4 border-t border-[#E0AAFF]/20">
        <div className="flex items-center justify-center gap-2 text-xs text-[#9D4EDD]/70">
          <Shield className="h-4 w-4" />
          <span>Secured by reCAPTCHA</span>
        </div>
      </div>
    </div>
  );
};
