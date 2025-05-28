
import { useState } from "react";
import { AccountFormValues, PersonalInfoFormValues } from "@/components/signup/schemas";
import { ProfileImage } from "@/components/signup/summary/types";

export const useSignupForm = () => {
  // Form states for persistence between steps
  const [accountData, setAccountData] = useState<AccountFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [personalData, setPersonalData] = useState<PersonalInfoFormValues>({
    name: "",
    nickname: "",
    gender: "",
    birthdate: undefined as unknown as Date,
  });

  const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);
  
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

  const handlePhotoUpload = (images: ProfileImage[] = []) => {
    setProfileImages(images);
    handleNextStep();
  };

  return {
    accountData,
    personalData,
    profileData,
    lifestyleData,
    profileImages,
    isLoading,
    setIsLoading,
    currentStep,
    totalSteps,
    progress,
    handleNextStep,
    handlePrevStep,
    handleSignupStep1,
    handleSignupStep2,
    handleProfileDataChange,
    handleLifestyleDataChange,
    handlePhotoUpload
  };
};
