
import React from "react";
import SignupStepIndicator from "./SignupStepIndicator";
import { Progress } from "@/components/ui/progress";
import SignupForm from "@/components/signup/SignupForm";
import SignupPersonalInfo from "@/components/signup/SignupPersonalInfo";
import SignupComplete from "@/components/signup/SignupComplete";
import SocialLogin from "@/components/login/SocialLogin";
import PrivacyNotice from "@/components/login/PrivacyNotice";
import TermsNotice from "@/components/signup/TermsNotice";

interface SignupCardProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  agreeToTerms: boolean;
  setAgreeToTerms: (agreeToTerms: boolean) => void;
  handleSignupStep1: (e: React.FormEvent) => void;
  passwordErrors: string[];
  passwordTouched: boolean;
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  birthdate: Date | undefined;
  setBirthdate: (birthdate: Date | undefined) => void;
  phone: string;
  setPhone: (phone: string) => void;
  handleSignupStep2: (e: React.FormEvent) => void;
  handlePrevStep: () => void;
  handleCompleteSignup: () => void;
  handleOAuthSignup: (provider: string) => void;
}

const SignupCard: React.FC<SignupCardProps> = ({
  currentStep,
  totalSteps,
  progress,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  showPassword,
  setShowPassword,
  agreeToTerms,
  setAgreeToTerms,
  handleSignupStep1,
  passwordErrors,
  passwordTouched,
  name,
  setName,
  gender,
  setGender,
  birthdate,
  setBirthdate,
  phone,
  setPhone,
  handleSignupStep2,
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
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
  );
};

export default SignupCard;
