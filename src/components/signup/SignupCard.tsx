
import React from "react";
import SignupStepIndicator from "./SignupStepIndicator";
import { Progress } from "@/components/ui/progress";
import SignupForm from "@/components/signup/SignupForm";
import SignupPersonalInfo from "@/components/signup/SignupPersonalInfo";
import SignupComplete from "@/components/signup/SignupComplete";
import ProfileDetailsForm from "@/components/signup/ProfileDetailsForm";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import TermsNotice from "@/components/signup/TermsNotice";
import { AccountFormValues, PersonalInfoFormValues } from "./schemas";

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
}

interface SignupCardProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  accountData: AccountFormValues;
  personalData: PersonalInfoFormValues;
  profileData: any;
  profileImages: ProfileImage[];
  isLoading: boolean;
  handleSignupStep1: (data: AccountFormValues) => void;
  handleSignupStep2: (data: PersonalInfoFormValues, images: ProfileImage[]) => void;
  handleProfileDataChange: (data: any) => void;
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
  profileImages,
  isLoading,
  handleSignupStep1,
  handleSignupStep2,
  handleProfileDataChange,
  handlePrevStep,
  handleCompleteSignup,
  handleOAuthSignup,
}) => {
  return (
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
      <SignupStepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Progress bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
      </div>
      
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
          
          <PrivacyNotice />
        </>
      )}

      {currentStep === 2 && (
        <SignupPersonalInfo
          defaultValues={personalData}
          isLoading={isLoading}
          onSubmit={handleSignupStep2}
          onBack={handlePrevStep}
          initialImages={profileImages}
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
      
      <div className="text-center mt-4 text-sm text-[#3B185F] dark:text-custom-light transition-colors duration-300">
        Already have an account?{" "}
        <a href="/login" className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white transition-colors font-bold underline decoration-2 underline-offset-2">
          Sign in
        </a>
      </div>
      
      <TermsNotice />
    </div>
  );
};

export default SignupCard;
