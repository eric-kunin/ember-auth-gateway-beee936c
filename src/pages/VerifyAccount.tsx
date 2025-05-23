
import { Card } from "@/components/ui/card";
import LoginBackground from "@/components/login/LoginBackground";
import PendingVerificationState from "@/components/verify/PendingVerificationState";
import SuccessVerificationState from "@/components/verify/SuccessVerificationState";
import ErrorVerificationState from "@/components/verify/ErrorVerificationState";
import VerificationProgress from "@/components/verify/VerificationProgress";
import { useVerification } from "@/hooks/useVerification";
import { motion, AnimatePresence } from "framer-motion";

const VerifyAccount = () => {
  const {
    verificationState,
    email,
    remainingTime,
    isResending,
    handleResendVerification,
    handleContinueToDashboard,
    handleBackToLogin
  } = useVerification();

  // Define transition variants for smoother animations
  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <LoginBackground>
      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={verificationState}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              duration: 0.5 
            }}
          >
            <Card className="w-full p-6 mx-auto bg-white/90 dark:bg-[#10002B]/95 border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20 rounded-xl shadow-xl backdrop-blur-sm">
              <VerificationProgress currentState={verificationState} />
              
              <div className="flex flex-col items-center justify-center text-center space-y-6 mt-6">
                <AnimatePresence mode="wait">
                  {verificationState === "pending" && (
                    <motion.div
                      key="pending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <PendingVerificationState
                        email={email}
                        remainingTime={remainingTime}
                        isResending={isResending}
                        onResend={handleResendVerification}
                        onBackToLogin={handleBackToLogin}
                        onContinue={handleContinueToDashboard}
                      />
                    </motion.div>
                  )}

                  {verificationState === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <SuccessVerificationState 
                        onContinue={handleContinueToDashboard}
                      />
                    </motion.div>
                  )}

                  {verificationState === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <ErrorVerificationState
                        remainingTime={remainingTime}
                        isResending={isResending}
                        onResend={handleResendVerification}
                        onBackToLogin={handleBackToLogin}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </LoginBackground>
  );
};

export default VerifyAccount;
