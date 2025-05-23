
import { Mail, ExternalLink, Send, RotateCw, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface PendingVerificationStateProps {
  email: string | null;
  remainingTime: number;
  isResending: boolean;
  onResend: () => void;
  onBackToLogin: () => void;
  onContinue: () => void;
}

const PendingVerificationState = ({
  email,
  remainingTime,
  isResending,
  onResend,
  onBackToLogin,
  onContinue,
}: PendingVerificationStateProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div 
        className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-100/80 dark:bg-purple-900/30"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Mail className="w-10 h-10 text-purple-600 dark:text-purple-300" />
      </motion.div>
      
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-[#240046] dark:text-white">
          Verify your email
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
            We've sent a verification email to{" "}
            {email ? (
              <span className="font-medium text-purple-700 dark:text-purple-300">
                {email}
              </span>
            ) : (
              <Skeleton className="inline-block w-32 h-4" />
            )}
          </p>
        </motion.div>
        
        <motion.div
          className="text-sm text-gray-500 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-purple-500 dark:text-purple-400 mt-0.5" />
            <p className="text-left">
              Please check your inbox and click on the verification link to activate your account.
            </p>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="pt-4 w-full space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] signin-button-hover flex items-center justify-center space-x-2"
          onClick={onContinue}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Continue to Dashboard</span>
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 relative"
          onClick={onResend}
          disabled={remainingTime > 0 || isResending}
        >
          {isResending ? (
            <div className="flex items-center justify-center space-x-2">
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </div>
          ) : remainingTime > 0 ? (
            <div className="flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Resend email ({remainingTime}s)</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Resend verification email</span>
            </div>
          )}
          
          {remainingTime > 0 && (
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-purple-500 dark:bg-purple-400"
              initial={{ width: "100%" }}
              animate={{ width: `${(remainingTime / 60) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          )}
        </Button>
        
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center space-x-2"
          onClick={onBackToLogin}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to login</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PendingVerificationState;
