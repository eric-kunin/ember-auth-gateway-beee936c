
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BackgroundElements from "@/components/login/BackgroundElements";
import { ThemeToggle } from "@/components/ThemeToggle";
import SignupCard from "@/components/signup/SignupCard";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  const [phone, setPhone] = useState("");
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
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
        
        <SignupCard 
          currentStep={currentStep}
          totalSteps={totalSteps}
          progress={progress}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={(val) => {
            setPassword(val);
            setPasswordTouched(true);
          }}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          agreeToTerms={agreeToTerms}
          setAgreeToTerms={setAgreeToTerms}
          handleSignupStep1={handleSignupStep1}
          passwordErrors={passwordErrors}
          passwordTouched={passwordTouched}
          name={name}
          setName={setName}
          gender={gender}
          setGender={setGender}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          phone={phone}
          setPhone={setPhone}
          handleSignupStep2={handleSignupStep2}
          handlePrevStep={handlePrevStep}
          handleCompleteSignup={handleCompleteSignup}
          handleOAuthSignup={handleOAuthSignup}
        />
      </main>
    </div>
  );
};

export default Signup;
