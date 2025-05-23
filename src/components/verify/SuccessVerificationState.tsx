
import { CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SuccessVerificationStateProps {
  onContinue: () => void;
}

const SuccessVerificationState = ({ onContinue }: SuccessVerificationStateProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-[#240046] dark:text-white">
          Email verified!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300">
          Your email has been successfully verified.
        </p>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/30">
          <p>You will be redirected to the dashboard shortly.</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          className="w-full mt-2 bg-green-600 hover:bg-green-700 signin-button-hover flex items-center justify-center space-x-2"
          onClick={onContinue}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Go to Dashboard</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessVerificationState;
