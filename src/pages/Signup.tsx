
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import SignupCard from "@/components/signup/SignupCard";
import { AccountFormValues, PersonalInfoFormValues } from "@/components/signup/schemas";
import { useAuth } from "@/hooks/useAuth";
import LoginBackground from "@/components/login/LoginBackground";
import { ProfileImage as ProfileImageType } from "@/components/signup/summary/types";

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

  const [profileImages, setProfileImages] = useState<ProfileImageType[]>([]);
  
  // Additional profile data - now with only bio and profession
  const [profileData, setProfileData] = useState({
    bio: "",
    profession: ""
  });

  // Lifestyle data now includes all the attributes moved from profile details
  const [lifestyleData, setLifestyleData] = useState({
    height: undefined as undefined | number,
    eyeColor: "",
    religion: "",
    religiousLevel: "",
    smokingStatus: "",
    drinkingStatus: "",
    lookingFor: "",
    lookingForGender: "",
    hobbies: [] as string[],
    pets: "",
    exercise: "",
    diet: ""
  });
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const totalSteps = 6; // Remains as 6 steps
  const progress = (currentStep / totalSteps) * 100;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
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
    handleNextStep();
  };

  const handleLifestyleDataChange = (data: any) => {
    setLifestyleData({...lifestyleData, ...data});
    handleNextStep();
  };

  const handlePhotoUpload = (images: ProfileImageType[] = []) => {
    setProfileImages(images);
    handleNextStep();
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
        gender: personalData.gender as "Male" | "Female" | "Other",
        phone: personalData.phone,
        bio: profileData.bio || "",
        profession: profileData.profession || "",
        eyeColor: lifestyleData.eyeColor || "",
        height: lifestyleData.height ? Number(lifestyleData.height) : undefined,
        religion: lifestyleData.religion || "",
        religiousLevel: lifestyleData.religiousLevel || "",
        smokingStatus: lifestyleData.smokingStatus || "",
        drinkingStatus: lifestyleData.drinkingStatus || "",
        lookingFor: lifestyleData.lookingFor || "",
        lookingForGender: lifestyleData.lookingForGender as "Male" | "Female" | "Other" | "Both" || "Both",
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
        lifestyleData={lifestyleData}
        profileImages={profileImages}
        isLoading={isLoading}
        handleSignupStep1={handleSignupStep1}
        handleSignupStep2={handleSignupStep2}
        handleProfileDataChange={handleProfileDataChange}
        handleLifestyleDataChange={handleLifestyleDataChange}
        handlePhotoUpload={handlePhotoUpload}
        handlePrevStep={handlePrevStep}
        handleCompleteSignup={handleCompleteSignup}
        handleOAuthSignup={handleOAuthSignup}
      />
    </LoginBackground>
  );
};

export default Signup;
