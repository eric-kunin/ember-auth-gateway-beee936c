
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/login/LoginForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import BackgroundElements from "@/components/login/BackgroundElements";
import UserCardsBackground from "@/components/login/UserCardsBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginFormValues } from "@/components/login/schemas";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <main className="flex-1 flex items-center justify-center relative">
        <BackgroundElements />
        <UserCardsBackground />
        
        {/* Login card */}
        <div className="relative z-10 w-full max-w-md p-4 sm:p-8 mx-2 sm:mx-4 my-8 sm:my-12 rounded-2xl 
                      bg-white/10 dark:bg-[#10002B]/80 shadow-xl backdrop-blur-md
                      border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20
                      transition-colors duration-300">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 transition-colors duration-300">ברוכים הבאים לAkhlaDate</h1>
            <p className="text-sm sm:text-base text-[#E0AAFF] dark:text-custom-lighter transition-colors duration-300">התחבר כדי להמשיך</p>
          </div>
          
          <LoginForm 
            onSubmit={handleEmailLogin}
            isLoading={isLoading}
          />

          <SocialLogin 
            handleOAuthLogin={handleOAuthLogin}
            isLoading={isLoading}
          />

          <PrivacyNotice />
          
          <div className="text-center text-sm text-[#E0AAFF] dark:text-custom-light transition-colors duration-300">
            אין לך חשבון עדיין?{" "}
            <a href="/signup" className="text-[#E0AAFF] dark:text-[#C77DFF] hover:text-white dark:hover:text-white transition-colors font-bold underline decoration-2 underline-offset-2">
              הירשם
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
