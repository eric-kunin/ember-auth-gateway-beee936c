
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
  
  // Password validation states
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Validate password when it changes
  useEffect(() => {
    if (passwordTouched) {
      const errors: string[] = [];
      
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
      }
      if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
      }
      
      setPasswordErrors(errors);
    }
  }, [password, passwordTouched]);

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
    setPasswordTouched(true);
    
    if (!email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
      });
      return;
    }
    
    if (passwordErrors.length > 0) {
      toast({
        variant: "destructive",
        title: "Password Error",
        description: passwordErrors[0],
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
          
          {/* Step indicators with connecting lines */}
          <div className="flex justify-center items-center mb-4 relative">
            {/* Connecting lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-0.5 bg-gray-300 dark:bg-gray-700 z-0"></div>
            
            {/* Green progress line */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 bg-green-500 z-[1] transition-all duration-500 ease-in-out"
              style={{ 
                width: currentStep === 1 ? '0%' : 
                       currentStep === 2 ? '50%' : 
                       '100%',
                left: currentStep === 1 ? '30%' : '50%'
              }}
            ></div>
            
            {/* Step circles */}
            <div className="flex justify-between w-full relative z-[2]">
              {[1, 2, 3].map((step) => (
                <div key={step} className={`flex items-center justify-center rounded-full w-8 h-8 text-white
                  ${step === currentStep 
                    ? "bg-green-500 border-2 border-white dark:border-[#10002B] shadow-lg scale-110" 
                    : step < currentStep 
                    ? "bg-green-500" 
                    : "bg-gray-300 dark:bg-gray-700"} 
                  transition-all duration-300 ease-in-out relative`}>
                  <span>{step}</span>
                  {step === currentStep && (
                    <div className="absolute -inset-1 rounded-full border-2 border-green-300 dark:border-green-700 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
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
                setPassword={(val) => {
                  setPassword(val);
                  setPasswordTouched(true);
                }}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
                isLoading={isLoading}
                handleSignup={handleSignupStep1}
                passwordErrors={passwordErrors}
                passwordTouched={passwordTouched}
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
            <a href="/login" className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white transition-colors font-bold underline decoration-2 underline-offset-2">
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
