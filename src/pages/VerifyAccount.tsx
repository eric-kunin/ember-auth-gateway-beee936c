
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginBackground from "@/components/login/LoginBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, loading } = useAuth();
  const [verificationState, setVerificationState] = useState<"pending" | "success" | "error">("pending");
  const [email, setEmail] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(60);

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
    }
  };

  return (
    <LoginBackground>
      <Card className="w-full max-w-md p-6 mx-auto bg-white/90 dark:bg-[#10002B]/95 border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20 rounded-xl shadow-xl">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {verificationState === "pending" && (
            <>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Mail className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h1 className="text-2xl font-bold text-[#240046] dark:text-white">
                Verify your email
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                We've sent a verification email to{" "}
                <span className="font-medium">{email || "your email address"}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please check your inbox and click on the verification link to continue.
              </p>
              
              <div className="pt-4 w-full">
                <Button
                  className="w-full mb-4 bg-[#9D4EDD] hover:bg-[#7B2CBF] signin-button-hover"
                  onClick={() => navigate("/dashboard")}
                >
                  Continue to Dashboard
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResendVerification}
                  disabled={remainingTime > 0}
                >
                  {remainingTime > 0 
                    ? `Resend email (${remainingTime}s)` 
                    : "Resend verification email"}
                </Button>
              </div>
            </>
          )}

          {verificationState === "success" && (
            <>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-[#240046] dark:text-white">
                Email verified!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your email has been successfully verified.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You will be redirected to the dashboard shortly.
              </p>
              
              <Button
                className="w-full mt-2 bg-[#9D4EDD] hover:bg-[#7B2CBF] signin-button-hover"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </>
          )}

          {verificationState === "error" && (
            <>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-[#240046] dark:text-white">
                Verification failed
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                We couldn't verify your email address.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The link may have expired or is invalid.
              </p>
              
              <div className="pt-4 w-full">
                <Button
                  className="w-full mb-4 bg-[#9D4EDD] hover:bg-[#7B2CBF] signin-button-hover"
                  onClick={handleResendVerification}
                  disabled={remainingTime > 0}
                >
                  {remainingTime > 0 
                    ? `Resend email (${remainingTime}s)` 
                    : "Resend verification email"}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  Back to login
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </LoginBackground>
  );
};

export default VerifyAccount;
