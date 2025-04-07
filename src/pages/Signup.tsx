
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BackgroundElements from "@/components/login/BackgroundElements";
import { ThemeToggle } from "@/components/ThemeToggle";
import SignupCard from "@/components/signup/SignupCard";
import { AccountFormValues } from "@/components/signup/schemas";
import { PersonalInfoFormValues } from "@/components/signup/schemas";
import { signUpUser } from "@/services/supabase/auth-service";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form states for persistence between steps
  const [accountData, setAccountData] = useState<AccountFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [personalData, setPersonalData] = useState<PersonalInfoFormValues>({
    name: "",
    gender: "",
    birthdate: undefined as unknown as Date,
    phone: ""
  });
  
  // Additional profile data
  const [profileData, setProfileData] = useState({
    bio: "",
    profession: "",
    eyeColor: "",
    height: undefined as number | undefined,
    religion: "",
    religiousLevel: "",
    smokingStatus: "",
    drinkingStatus: "",
    lookingFor: "",
    lookingForGender: "",
    languageIds: [] as number[]
  });
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const handleSignupStep1 = (data: AccountFormValues) => {
    setAccountData(data);
    handleNextStep();
  };

  const handleSignupStep2 = (data: PersonalInfoFormValues) => {
    setPersonalData(data);
    handleNextStep();
  };

  const handleProfileDataChange = (data: any) => {
    setProfileData({...profileData, ...data});
  };

  const handleCompleteSignup = async () => {
    setIsLoading(true);
    
    try {
      // Combine all data for signup
      const userData = {
        email: accountData.email,
        password: accountData.password,
        confirmPassword: accountData.confirmPassword,
        agreeToTerms: accountData.agreeToTerms,
        name: personalData.name,
        gender: personalData.gender,
        birthdate: personalData.birthdate,
        phone: personalData.phone,
        ...profileData
      };
      
      // Call signup service
      const { user, error } = await signUpUser(userData);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error,
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Account Created!",
        description: "Your account has been successfully created.",
      });
      
      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An error occurred during signup.",
      });
    } finally {
      setIsLoading(false);
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
      navigate("/dashboard");
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
          accountData={accountData}
          personalData={personalData}
          profileData={profileData}
          isLoading={isLoading}
          handleSignupStep1={handleSignupStep1}
          handleSignupStep2={handleSignupStep2}
          handleProfileDataChange={handleProfileDataChange}
          handlePrevStep={handlePrevStep}
          handleCompleteSignup={handleCompleteSignup}
          handleOAuthSignup={handleOAuthSignup}
        />
      </main>
    </div>
  );
};

export default Signup;
