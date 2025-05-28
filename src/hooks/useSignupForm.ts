import { useState } from "react";
import { AccountFormValues, PersonalInfoFormValues } from "@/components/signup/schemas";
import { ProfileImage } from "@/components/signup/image-upload/types";

export const useSignupForm = () => {
  // Form states for persistence between steps
  const [accountData, setAccountData] = useState<AccountFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [personalData, setPersonalData] = useState<PersonalInfoFormValues>({
    nickname: "",
    gender: "",
    birthdate: undefined as unknown as Date,
  });

  const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);
  
  // Additional profile data - now includes name, bio and profession
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profession: ""
  });

  // First lifestyle data - Physical and Religious info
  const [lifestyleData1, setLifestyleData1] = useState({
    height: undefined as undefined | number,
    eyeColor: "",
    religion: "",
    religiousLevel: "",
  });

  // Second lifestyle data - Habits and Preferences
  const [lifestyleData2, setLifestyleData2] = useState({
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
  
  const totalSteps = 7; // Now 7 steps: Account, Personal, Profile, Lifestyle1, Lifestyle2, Photos, Summary
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

  const handleLifestyleData1Change = (data: any) => {
    setLifestyleData1({...lifestyleData1, ...data});
    handleNextStep();
  };

  const handleLifestyleData2Change = (data: any) => {
    setLifestyleData2({...lifestyleData2, ...data});
    handleNextStep();
  };

  const handlePhotoUpload = (images: ProfileImage[] = []) => {
    setProfileImages(images);
    handleNextStep();
  };

  // Combine lifestyle data for backward compatibility
  const lifestyleData = {
    ...lifestyleData1,
    ...lifestyleData2
  };

  return {
    accountData,
    personalData,
    profileData,
    lifestyleData,
    lifestyleData1,
    lifestyleData2,
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
    handleLifestyleData1Change,
    handleLifestyleData2Change,
    handlePhotoUpload
  };
};
