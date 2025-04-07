
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BackgroundElements from "@/components/login/BackgroundElements";
import SignupForm from "@/components/signup/SignupForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import TermsNotice from "@/components/signup/TermsNotice";
import { ThemeToggle } from "@/components/ThemeToggle";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must agree to the Terms of Service",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // This is just a mockup without actual signup
      setTimeout(() => {
        toast({
          title: "Account Created!",
          description: "Your account has been successfully created.",
        });
        setIsLoading(false);
        navigate("/login");
      }, 1500);
      
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
      });
    }
  };

  const handleOAuthSignup = (provider: string) => {
    setIsLoading(true);
    
    // This is just a mockup without actual OAuth signup
    setTimeout(() => {
      toast({
        title: `${provider} Signup`,
        description: `Signing up with ${provider}...`,
      });
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-[#0B0205] transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <main className="flex-1 flex items-center justify-center relative">
        <BackgroundElements />
        
        {/* Signup card */}
        <div className="relative z-10 w-full max-w-md p-8 mx-4 my-12 rounded-2xl 
                      bg-white/80 dark:bg-[#10002B]/95 shadow-xl border-0
                      transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#240046] dark:text-white mb-1 transition-colors duration-300">Create an Account</h1>
            <p className="text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">Sign up to get started</p>
          </div>
          
          <SignupForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            agreeToTerms={agreeToTerms}
            setAgreeToTerms={setAgreeToTerms}
            isLoading={isLoading}
            handleSignup={handleSignup}
          />

          <SocialLogin 
            handleOAuthLogin={handleOAuthSignup}
            isLoading={isLoading}
          />
          
          <PrivacyNotice />
          
          <div className="text-center text-sm text-[#3B185F] dark:text-custom-light transition-colors duration-300">
            Already have an account?{" "}
            <a href="/login" className="text-[#240046] dark:text-white hover:text-custom-primary dark:hover:text-custom-lighter transition-colors font-medium">
              Sign in
            </a>
          </div>
          
          <TermsNotice />
        </div>
      </main>
    </div>
  );
};

export default Signup;
