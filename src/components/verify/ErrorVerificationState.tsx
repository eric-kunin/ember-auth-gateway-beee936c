
import { AlertCircle, ArrowLeft, Send, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ErrorVerificationStateProps {
  remainingTime: number;
  isResending: boolean;
  onResend: () => void;
  onBackToLogin: () => void;
}

const ErrorVerificationState = ({ 
  remainingTime, 
  isResending, 
  onResend, 
  onBackToLogin 
}: ErrorVerificationStateProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
        animate={{ 
          x: [0, -10, 10, -10, 10, 0],
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-[#240046] dark:text-white">
          Verification failed
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300">
          We couldn't verify your email address.
        </p>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800/30">
          <p>The link may have expired or is invalid. Please request a new verification link.</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="pt-4 w-full space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] signin-button-hover flex items-center justify-center space-x-2"
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
              className="absolute bottom-0 left-0 h-0.5 bg-purple-500"
              initial={{ width: "100%" }}
              animate={{ width: `${(remainingTime / 60) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          )}
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={onBackToLogin}
        >
          <div className="flex items-center justify-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </div>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ErrorVerificationState;
