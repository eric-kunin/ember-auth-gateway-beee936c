
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import BackgroundElements from "@/components/login/BackgroundElements";
import SignupForm from "@/components/signup/SignupForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import TermsNotice from "@/components/signup/TermsNotice";

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B0205]">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Background elements */}
      <BackgroundElements />
      
      {/* App Logo Header */}
      <div className="relative z-10 mb-6">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
            alt="AkhlaDate Logo" 
            className="h-20 w-20 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      {/* Signup card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-2xl bg-[#10002B]/95 shadow-xl border-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create an Account</h1>
          <p className="text-custom-lighter">Sign up to get started</p>
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
        
        <div className="text-center text-sm text-custom-light">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:text-custom-lighter transition-colors font-medium">
            Sign in
          </a>
        </div>
        
        <TermsNotice />
      </div>
    </div>
  );
};

export default Signup;
