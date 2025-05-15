
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import SignupCard from "@/components/signup/SignupCard";
import { AccountFormValues, PersonalInfoFormValues } from "@/components/signup/schemas";
import { useAuth } from "@/hooks/useAuth";
import LoginBackground from "@/components/login/LoginBackground";

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, isAuthenticated, loading } = useAuth();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
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

  const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);
  
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

  const handleSignupStep2 = (data: PersonalInfoFormValues, images: ProfileImage[] = []) => {
    setPersonalData(data);
    setProfileImages(images);
    handleNextStep();
  };

  const handleProfileDataChange = (data: any) => {
    setProfileData({...profileData, ...data});
  };

  const handleCompleteSignup = async () => {
    setIsLoading(true);
    
    try {
      // Combine data for profile creation
      const completeProfileData = {
        name: personalData.name,
        firstName: personalData.name.split(' ')[0],
        lastName: personalData.name.split(' ').slice(1).join(' '),
        birthdate: personalData.birthdate,
        gender: personalData.gender,
        phone: personalData.phone,
        bio: profileData.bio,
        profession: profileData.profession,
        eyeColor: profileData.eyeColor,
        height: profileData.height,
        religion: profileData.religion,
        religiousLevel: profileData.religiousLevel,
        smokingStatus: profileData.smokingStatus,
        drinkingStatus: profileData.drinkingStatus,
        lookingFor: profileData.lookingFor,
        lookingForGender: profileData.lookingForGender,
      };

      // Call auth service to sign up
      await signUp(accountData.email, accountData.password, completeProfileData);
      
      // Navigate is handled by useEffect when isAuthenticated changes
      toast({
        title: "Account Created!",
        description: "Your account has been successfully created.",
      });
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
    
    // This would use Supabase OAuth in a real implementation
    // Example: supabase.auth.signInWithOAuth({ provider: provider.toLowerCase() })
    setTimeout(() => {
      toast({
        title: `${provider} Signup`,
        description: `Signing up with ${provider}...`,
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
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
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <SignupCard 
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
        accountData={accountData}
        personalData={personalData}
        profileData={profileData}
        profileImages={profileImages}
        isLoading={isLoading}
        handleSignupStep1={handleSignupStep1}
        handleSignupStep2={handleSignupStep2}
        handleProfileDataChange={handleProfileDataChange}
        handlePrevStep={handlePrevStep}
        handleCompleteSignup={handleCompleteSignup}
        handleOAuthSignup={handleOAuthSignup}
      />
    </LoginBackground>
  );
};

export default Signup;
