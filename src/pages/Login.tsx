
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/login/LoginForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import BackgroundElements from "@/components/login/BackgroundElements";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email and password are required",
      });
      return;
    }
    
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
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0205] dark:bg-[#0B0205]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <main className="flex-1 flex items-center justify-center relative">
        <BackgroundElements />
        
        {/* Login card */}
        <div className="relative z-10 w-full max-w-md p-8 mx-4 my-12 rounded-2xl bg-[#10002B]/95 shadow-xl border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-custom-lighter">Sign in to access your account</p>
          </div>
          
          <LoginForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            isLoading={isLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleEmailLogin={handleEmailLogin}
          />

          <SocialLogin 
            handleOAuthLogin={handleOAuthLogin}
            isLoading={isLoading}
          />

          <PrivacyNotice />
          
          <div className="text-center text-sm text-custom-light">
            Don't have an account?{" "}
            <a href="/signup" className="text-white hover:text-custom-lighter transition-colors font-medium">
              Sign up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
