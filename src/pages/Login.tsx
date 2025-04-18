
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginFormValues } from "@/components/login/schemas";
import LoginCard from "@/components/login/LoginCard";
import LoginBackground from "@/components/login/LoginBackground";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleEmailLogin = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      
      // This is just a mockup without actual authentication
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "You've successfully logged in.",
        });
        setIsLoading(false);
        navigate("/dashboard");
      }, 1500);
      
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An error occurred during login",
      });
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    
    // This is just a mockup without actual OAuth authentication
    setTimeout(() => {
      toast({
        title: `${provider} Login`,
        description: `Logging in with ${provider}...`,
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleToggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <LoginBackground>
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
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
