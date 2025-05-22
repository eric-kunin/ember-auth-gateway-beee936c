
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
import SignupLifestyleInfo from "./SignupLifestyleInfo";
import SignupProfilePhotos from "./SignupProfilePhotos";
import SignupSummary from "./SignupSummary";
import { ProfileImage } from "./summary/types";

interface SignupCardProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  accountData: AccountFormValues;
  personalData: PersonalInfoFormValues;
  profileData: any;
  lifestyleData: any;
  profileImages: ProfileImage[];
  isLoading: boolean;
  handleSignupStep1: (data: AccountFormValues) => void;
  handleSignupStep2: (data: PersonalInfoFormValues) => void;
  handleProfileDataChange: (data: any) => void;
  handleLifestyleDataChange: (data: any) => void;
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
  profileImages,
  isLoading,
  handleSignupStep1,
  handleSignupStep2,
  handleProfileDataChange,
  handleLifestyleDataChange,
  handlePhotoUpload,
  handlePrevStep,
  handleCompleteSignup,
  handleOAuthSignup,
}) => {
  return (
    <motion.div 
      className="relative z-10 w-full max-w-md p-4 sm:p-8 mx-2 sm:mx-4 my-8 sm:my-12 rounded-2xl 
                bg-white/90 dark:bg-[#10002B]/95 shadow-xl
                border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20
                transition-colors duration-300"
      style={{ 
        minWidth: '380px', // Increased from 320px to 380px
        width: 'max-content',
        minHeight: '520px' // Slightly increased for better proportions
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        className="w-full" // Ensure consistent width
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
          <SignupLifestyleInfo
            defaultValues={lifestyleData}
            isLoading={isLoading}
            onSubmit={handleLifestyleDataChange}
            onBack={handlePrevStep}
          />
        )}

        {currentStep === 5 && (
          <SignupProfilePhotos
            isLoading={isLoading}
            onSubmit={handlePhotoUpload}
            onBack={handlePrevStep}
            initialImages={profileImages}
          />
        )}

        {currentStep === 6 && (
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
