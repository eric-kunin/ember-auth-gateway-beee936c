
import { CircleCheck, CircleX, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

type VerificationState = "pending" | "success" | "error";

interface VerificationProgressProps {
  currentState: VerificationState;
}

const VerificationProgress = ({ currentState }: VerificationProgressProps) => {
  // Calculate progress percentage based on the current state
  const getProgress = () => {
    switch (currentState) {
      case "pending":
        return 33;
      case "success":
        return 100;
      case "error":
        return 66;
      default:
        return 0;
    }
  };

  // Get status icon based on verification state
  const getStatusIcon = (state: VerificationState) => {
    switch (state) {
      case "pending":
        return <MailCheck className="w-5 h-5 text-amber-500" />;
      case "success":
        return <CircleCheck className="w-5 h-5 text-green-500" />;
      case "error":
        return <CircleX className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between mb-1 text-xs">
        <span className="text-gray-500 dark:text-gray-400">Verification Progress</span>
        <span className="font-medium text-purple-600 dark:text-purple-400">
          {currentState === "pending" && "Waiting for verification"}
          {currentState === "success" && "Verification complete"}
          {currentState === "error" && "Verification failed"}
        </span>
      </div>
      
      <div className="relative">
        <Progress 
          value={getProgress()} 
          className="h-2 bg-purple-100 dark:bg-purple-950/30"
        />
        
        <div className="absolute top-[-8px] w-full flex justify-between">
          {/* Email Sent Step */}
          <motion.div 
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentState === "pending" 
                ? "bg-amber-100 dark:bg-amber-900/30 border border-amber-400"
                : currentState === "success"
                ? "bg-green-100 dark:bg-green-900/30 border border-green-400"
                : "bg-red-100 dark:bg-red-900/30 border border-red-400"
            }`}
            animate={{ 
              scale: currentState === "pending" ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              duration: 1.5, 
              repeat: currentState === "pending" ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            {getStatusIcon(currentState)}
          </motion.div>
          
          {/* Processing Step */}
          <motion.div 
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentState === "error" 
                ? "bg-red-100 dark:bg-red-900/30 border border-red-400"
                : currentState === "success"
                ? "bg-green-100 dark:bg-green-900/30 border border-green-400"
                : "bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700"
            }`}
            animate={{ 
              scale: currentState === "error" ? [1, 1.1, 1] : 1 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: currentState === "error" ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            {currentState !== "pending" && getStatusIcon(currentState === "success" ? "success" : "error")}
          </motion.div>
          
          {/* Complete Step */}
          <motion.div 
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentState === "success" 
                ? "bg-green-100 dark:bg-green-900/30 border border-green-400"
                : "bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700"
            }`}
            animate={{ 
              scale: currentState === "success" ? [1, 1.1, 1] : 1 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: currentState === "success" ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            {currentState === "success" && getStatusIcon("success")}
          </motion.div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
        <span>Email sent</span>
        <span>Verification</span>
        <span>Complete</span>
      </div>
    </div>
  );
};

export default VerificationProgress;
