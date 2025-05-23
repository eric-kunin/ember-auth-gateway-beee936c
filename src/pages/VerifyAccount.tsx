
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginBackground from "@/components/login/LoginBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, Send, RotateCw, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, loading } = useAuth();
  const [verificationState, setVerificationState] = useState<"pending" | "success" | "error">("pending");
  const [email, setEmail] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [isResending, setIsResending] = useState(false);

  // Get email from URL params or session
  useEffect(() => {
    const fetchEmail = async () => {
      const emailFromParams = searchParams.get("email");
      
      if (emailFromParams) {
        setEmail(emailFromParams);
      } else {
        // Try to get email from session
        const { data } = await supabase.auth.getSession();
        if (data.session?.user?.email) {
          setEmail(data.session.user.email);
        }
      }
    };
    
    fetchEmail();
  }, [searchParams]);

  // Handle verification token if present
  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");
    
    if (token && type === "signup") {
      handleVerification(token);
    }
  }, [searchParams]);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  const handleVerification = async (token: string) => {
    try {
      // Verify the token with Supabase
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "signup",
      });

      if (error) {
        setVerificationState("error");
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: error.message,
        });
      } else {
        setVerificationState("success");
        toast({
          title: "Account verified",
          description: "Your account has been successfully verified.",
        });
        
        // Redirect to dashboard after successful verification
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error: any) {
      setVerificationState("error");
      toast({
        variant: "destructive",
        title: "Verification error",
        description: error.message || "An error occurred during verification.",
      });
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please provide your email address.",
      });
      return;
    }

    setIsResending(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to resend",
          description: error.message,
        });
      } else {
        toast({
          title: "Verification email sent",
          description: "A new verification email has been sent to your inbox.",
        });
        setRemainingTime(60); // Reset the timer
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred while resending the verification email.",
      });
    } finally {
      setIsResending(false);
    }
  };

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
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                {verificationState === "pending" && (
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
                        onClick={() => navigate("/dashboard")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Continue to Dashboard</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 relative"
                        onClick={handleResendVerification}
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
                        onClick={() => navigate("/login")}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to login</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {verificationState === "success" && (
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
                        onClick={() => navigate("/dashboard")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Go to Dashboard</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {verificationState === "error" && (
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
                        onClick={handleResendVerification}
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
                        onClick={() => navigate("/login")}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to login</span>
                        </div>
                      </Button>
                    </motion.div>
                  </motion.div>
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
