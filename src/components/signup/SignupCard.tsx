
import React from "react";
import SignupStepIndicator from "./SignupStepIndicator";
import { Progress } from "@/components/ui/progress";
import SignupForm from "@/components/signup/SignupForm";
import SignupPersonalInfo from "@/components/signup/SignupPersonalInfo";
import SignupComplete from "@/components/signup/SignupComplete";
import ProfileDetailsForm from "@/components/signup/ProfileDetailsForm";
import SocialLogin from "@/components/login/SocialLogin";
import { AccountFormValues, PersonalInfoFormValues } from "./schemas";
import { motion } from "framer-motion";
import SignupLifestyleInfo1 from "./lifestyle-info/SignupLifestyleInfo1";
import SignupLifestyleInfo2 from "./lifestyle-info/SignupLifestyleInfo2";
import SignupProfilePhotos from "./SignupProfilePhotos";
import SignupSummary from "./SignupSummary";
import { ProfileImage } from "./summary/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

interface SignupCardProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  accountData: AccountFormValues;
  personalData: PersonalInfoFormValues;
  profileData: any;
  lifestyleData: any;
  lifestyleData1: any;
  lifestyleData2: any;
  profileImages: ProfileImage[];
  isLoading: boolean;
  handleSignupStep1: (data: AccountFormValues) => void;
  handleSignupStep2: (data: PersonalInfoFormValues) => void;
  handleProfileDataChange: (data: any) => void;
  handleLifestyleData1Change: (data: any) => void;
  handleLifestyleData2Change: (data: any) => void;
  handlePhotoUpload: (images: ProfileImage[]) => void;
  handlePrevStep: () => void;
  handleCompleteSignup: () => void;
  handleOAuthSignup: (provider: string) => void;
}

const SignupCard: React.FC<SignupCardProps> = ({
  currentStep,
  totalSteps,
  progress,
  accountData,
  personalData,
  profileData,
  lifestyleData,
  lifestyleData1,
  lifestyleData2,
  profileImages,
  isLoading,
  handleSignupStep1,
  handleSignupStep2,
  handleProfileDataChange,
  handleLifestyleData1Change,
  handleLifestyleData2Change,
  handlePhotoUpload,
  handlePrevStep,
  handleCompleteSignup,
  handleOAuthSignup,
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      className="relative z-10 w-full max-w-md p-3 sm:p-6 md:p-8 mx-auto sm:mx-4 my-6 sm:my-8 md:my-12 rounded-xl sm:rounded-2xl 
                bg-white/90 dark:bg-[#10002B]/95 shadow-xl
                border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20
                transition-colors duration-300"
      style={{ 
        width: isMobile ? '92%' : 'max-content',
        minWidth: isMobile ? 'auto' : '380px',
        maxWidth: isMobile ? '100%' : '420px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Theme toggle positioned consistently with login page */}
      <div className="absolute top-[-20px] right-[-20px] z-50">
        <ThemeToggle />
      </div>
      
      <div className="text-center mb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#240046] dark:text-white mb-1 transition-colors duration-300">
          Create an Account
        </h1>
        <p className="text-sm sm:text-base text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">
          Sign up to get started
        </p>
      </div>
      
      <SignupStepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mb-6">
        <Progress value={progress} className="h-2" />
      </div>
      
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {currentStep === 1 && (
          <>
            <SignupForm 
              defaultValues={accountData}
              isLoading={isLoading}
              onSubmit={handleSignupStep1}
            />

            <SocialLogin 
              handleOAuthLogin={handleOAuthSignup}
              isLoading={isLoading}
            />
          </>
        )}

        {currentStep === 2 && (
          <SignupPersonalInfo
            defaultValues={personalData}
            isLoading={isLoading}
            onSubmit={handleSignupStep2}
            onBack={handlePrevStep}
          />
        )}

        {currentStep === 3 && (
          <ProfileDetailsForm
            defaultValues={profileData}
            personalData={personalData}
            isLoading={isLoading}
            onSubmit={handleProfileDataChange}
            onBack={handlePrevStep}
            onComplete={handleCompleteSignup}
          />
        )}

        {currentStep === 4 && (
          <SignupLifestyleInfo1
            defaultValues={lifestyleData1}
            isLoading={isLoading}
            onSubmit={handleLifestyleData1Change}
            onBack={handlePrevStep}
          />
        )}

        {currentStep === 5 && (
          <SignupLifestyleInfo2
            defaultValues={lifestyleData2}
            isLoading={isLoading}
            onSubmit={handleLifestyleData2Change}
            onBack={handlePrevStep}
          />
        )}

        {currentStep === 6 && (
          <SignupProfilePhotos
            isLoading={isLoading}
            onSubmit={handlePhotoUpload}
            onBack={handlePrevStep}
            initialImages={profileImages}
          />
        )}

        {currentStep === 7 && (
          <SignupSummary
            accountData={accountData}
            personalData={personalData}
            profileData={profileData}
            lifestyleData={lifestyleData}
            profileImages={profileImages}
            isLoading={isLoading}
            onBack={handlePrevStep}
            onComplete={handleCompleteSignup}
          />
        )}
      </motion.div>
      
      <div className="text-center mt-4 text-sm text-[#3B185F] dark:text-custom-light transition-colors duration-300">
        Already have an account?{" "}
        <a href="/login" className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white transition-colors font-bold underline decoration-2 underline-offset-2">
          Sign in
        </a>
      </div>
    </motion.div>
  );
};

export default SignupCard;
