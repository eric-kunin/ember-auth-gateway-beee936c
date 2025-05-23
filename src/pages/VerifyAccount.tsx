
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

  return (
    <LoginBackground>
      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={verificationState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full p-6 mx-auto bg-white/90 dark:bg-[#10002B]/95 border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20 rounded-xl shadow-xl backdrop-blur-sm">
              <VerificationProgress currentState={verificationState} />
              
              <div className="flex flex-col items-center justify-center text-center space-y-6 mt-6">
                {verificationState === "pending" && (
                  <PendingVerificationState
                    email={email}
                    remainingTime={remainingTime}
                    isResending={isResending}
                    onResend={handleResendVerification}
                    onBackToLogin={handleBackToLogin}
                    onContinue={handleContinueToDashboard}
                  />
                )}

                {verificationState === "success" && (
                  <SuccessVerificationState 
                    onContinue={handleContinueToDashboard}
                  />
                )}

                {verificationState === "error" && (
                  <ErrorVerificationState
                    remainingTime={remainingTime}
                    isResending={isResending}
                    onResend={handleResendVerification}
                    onBackToLogin={handleBackToLogin}
                  />
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </LoginBackground>
  );
};

export default VerifyAccount;
