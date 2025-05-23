
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormValues } from "@/components/login/schemas";
import LoginCard from "@/components/login/LoginCard";
import LoginBackground from "@/components/login/LoginBackground";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailLogin = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      // Navigate is handled by the useEffect above when isAuthenticated changes
    } catch (error: any) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    // This is a mockup - in a real implementation, you'd use Supabase OAuth
    // Example: supabase.auth.signInWithOAuth({ provider: provider.toLowerCase() })
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleToggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  if (loading) {
    return (
      <LoginBackground>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </LoginBackground>
    );
  }

  return (
    <LoginBackground>
      <LoginCard 
        isLoading={isLoading}
        showForgotPassword={showForgotPassword}
        handleEmailLogin={handleEmailLogin}
        handleOAuthLogin={handleOAuthLogin}
        handleToggleForgotPassword={handleToggleForgotPassword}
      />
    </LoginBackground>
  );
};

export default Login;
