
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useVerification = () => {
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

  const handleContinueToDashboard = () => {
    navigate("/dashboard");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return {
    verificationState,
    email,
    remainingTime,
    isResending,
    handleResendVerification,
    handleContinueToDashboard,
    handleBackToLogin,
  };
};
