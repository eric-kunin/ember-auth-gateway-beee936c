
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BackgroundElements from "@/components/login/BackgroundElements";
import SignupForm from "@/components/signup/SignupForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import TermsNotice from "@/components/signup/TermsNotice";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Progress } from "@/components/ui/progress";
import SignupPersonalInfo from "@/components/signup/SignupPersonalInfo";
import SignupComplete from "@/components/signup/SignupComplete";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  const [phone, setPhone] = useState("");

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignupStep1 = async (e: React.FormEvent) => {
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
    
    // Move to step 2
    handleNextStep();
  };

  const handleSignupStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !gender || !birthdate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
      });
      return;
    }
    
    // Move to step 3
    handleNextStep();
  };

  const handleCompleteSignup = () => {
    setIsLoading(true);
    
    // This is just a mockup without actual signup
    setTimeout(() => {
      toast({
        title: "Account Created!",
        description: "Your account has been successfully created.",
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
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
    <div className="min-h-screen w-full flex flex-col bg-[#f5efff] dark:bg-[#0B0205] transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <main className="flex-1 flex items-center justify-center relative">
        <BackgroundElements />
        
        {/* Signup card */}
        <div className="relative z-10 w-full max-w-md p-4 sm:p-8 mx-2 sm:mx-4 my-8 sm:my-12 rounded-2xl 
                      bg-white/90 dark:bg-[#10002B]/95 shadow-xl
                      border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20
                      transition-colors duration-300">
          <div className="text-center mb-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#240046] dark:text-white mb-1 transition-colors duration-300">
              Create an Account
            </h1>
            <p className="text-sm sm:text-base text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">
              Sign up to get started
            </p>
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-center items-center space-x-3 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex items-center justify-center rounded-full w-8 h-8 text-white
                ${step === currentStep 
                  ? "bg-green-500" 
                  : step < currentStep 
                  ? "bg-green-500" 
                  : "bg-gray-300 dark:bg-gray-700"}`}>
                {step}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
          </div>
          
          {currentStep === 1 && (
            <>
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
                handleSignup={handleSignupStep1}
              />

              <SocialLogin 
                handleOAuthLogin={handleOAuthSignup}
                isLoading={isLoading}
              />
              
              <PrivacyNotice />
            </>
          )}

          {currentStep === 2 && (
            <SignupPersonalInfo
              name={name}
              setName={setName}
              gender={gender}
              setGender={setGender}
              birthdate={birthdate}
              setBirthdate={setBirthdate}
              phone={phone}
              setPhone={setPhone}
              isLoading={isLoading}
              handleNext={handleSignupStep2}
              handleBack={handlePrevStep}
            />
          )}

          {currentStep === 3 && (
            <SignupComplete
              isLoading={isLoading}
              handleComplete={handleCompleteSignup}
              handleBack={handlePrevStep}
            />
          )}
          
          <div className="text-center text-sm text-[#3B185F] dark:text-custom-light transition-colors duration-300">
            Already have an account?{" "}
            <a href="/login" className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white transition-colors font-medium underline font-bold">
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
