
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupCard from "@/components/signup/SignupCard";
import LoginBackground from "@/components/login/LoginBackground";
import { useAuth } from "@/hooks/useAuth";
import { useSignupForm } from "@/hooks/useSignupForm";
import { useOAuthSignupHandler } from "@/components/signup/handlers/OAuthSignupHandler";
import { useSignupCompletion } from "@/components/signup/handlers/SignupCompletionHandler";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  
  // Custom hooks for signup functionality
  const {
    accountData,
    personalData,
    profileData,
    lifestyleData,
    lifestyleData1,
    lifestyleData2,
    profileImages,
    currentStep,
    totalSteps,
    progress,
    handleSignupStep1,
    handleSignupStep2,
    handleProfileDataChange,
    handleLifestyleData1Change,
    handleLifestyleData2Change,
    handlePhotoUpload,
    handlePrevStep,
  } = useSignupForm();

  const { handleOAuthSignup } = useOAuthSignupHandler();
  
  const { handleCompleteSignup, isLoading } = useSignupCompletion({
    accountData,
    personalData,
    profileData,
    lifestyleData
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
      <SignupCard 
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
        accountData={accountData}
        personalData={personalData}
        profileData={profileData}
        lifestyleData={lifestyleData}
        lifestyleData1={lifestyleData1}
        lifestyleData2={lifestyleData2}
        profileImages={profileImages}
        isLoading={isLoading}
        handleSignupStep1={handleSignupStep1}
        handleSignupStep2={handleSignupStep2}
        handleProfileDataChange={handleProfileDataChange}
        handleLifestyleData1Change={handleLifestyleData1Change}
        handleLifestyleData2Change={handleLifestyleData2Change}
        handlePhotoUpload={handlePhotoUpload}
        handlePrevStep={handlePrevStep}
        handleCompleteSignup={handleCompleteSignup}
        handleOAuthSignup={handleOAuthSignup}
      />
    </LoginBackground>
  );
};

export default Signup;
