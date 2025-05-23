
import { motion } from "framer-motion";
import LoginForm from "@/components/login/LoginForm";
import SocialLogin from "@/components/login/SocialLogin";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm";
import { LoginFormValues } from "@/components/login/schemas";
import { LogIn, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LoginCardProps {
  isLoading: boolean;
  showForgotPassword: boolean;
  handleEmailLogin: (data: LoginFormValues) => Promise<void>;
  handleOAuthLogin: (provider: string) => void;
  handleToggleForgotPassword: () => void;
}

const LoginCard = ({
  isLoading,
  showForgotPassword,
  handleEmailLogin,
  handleOAuthLogin,
  handleToggleForgotPassword,
}: LoginCardProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="relative z-10 w-full max-w-md mx-2 sm:mx-4 my-8 sm:my-12"
      style={{
        minWidth: isMobile ? 'auto' : '380px',
        width: isMobile ? '95%' : 'auto'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 sm:p-8 rounded-2xl bg-white/85 dark:bg-[#10002B]/95 border-indigo-400/20 dark:border-[#9D4EDD]/20 shadow-xl relative">
        {/* Theme toggle positioned on the card */}
        <div className="absolute top-[-20px] right-[-20px]">
          <ThemeToggle />
        </div>
        
        <div className="text-center mb-6 sm:mb-8 mt-4">
          <motion.div 
            className="flex items-center justify-center gap-2 mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <LogIn className="w-6 h-6 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Sign in to continue
            </h1>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center gap-2 mt-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Users className="w-5 h-5 text-custom-light" />
            <p className="text-md sm:text-lg text-custom-light font-semibold">
              Find new connections
            </p>
          </motion.div>
        </div>
        
        {showForgotPassword ? (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <ForgotPasswordForm 
              onCancel={handleToggleForgotPassword} 
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <LoginForm 
              onSubmit={handleEmailLogin}
              isLoading={isLoading}
              onForgotPassword={handleToggleForgotPassword}
            />

            <SocialLogin 
              handleOAuthLogin={handleOAuthLogin}
              isLoading={isLoading}
            />
          </motion.div>
        )}
        
        <motion.div 
          className="text-center mt-4 text-sm text-custom-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="mb-2">
            Don't have an account yet?{" "}
            <a href="/signup" className="text-[#C77DFF] hover:text-[#E0AAFF] font-bold underline decoration-2 underline-offset-2 transition-all duration-300">
              Sign up
            </a>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default LoginCard;
