
import { motion } from "framer-motion";
import LoginForm from "@/components/login/LoginForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm";
import { LoginFormValues } from "@/components/login/schemas";

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
  return (
    <motion.div 
      className="relative z-10 w-full max-w-md p-4 sm:p-8 mx-2 sm:mx-4 my-8 sm:my-12 rounded-2xl 
                bg-white/10 dark:bg-[#10002B]/80 shadow-xl backdrop-blur-md
                border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20
                transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[#E0AAFF] dark:text-white mb-1 transition-colors duration-300">
          Welcome to AkhlaDate
        </h1>
        <p className="text-sm sm:text-base text-[#9D4EDD] dark:text-custom-lighter transition-colors duration-300">
          Sign in to continue
        </p>
        <motion.p 
          className="text-md sm:text-lg text-[#7B2CBF] dark:text-custom-light font-semibold mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Find New Connections
        </motion.p>
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

      <PrivacyNotice />
      
      <motion.div 
        className="text-center mt-4 text-sm text-[#E0AAFF] dark:text-custom-light transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="mb-2">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-white dark:hover:text-white transition-colors font-bold underline decoration-2 underline-offset-2">
            Sign up
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginCard;
