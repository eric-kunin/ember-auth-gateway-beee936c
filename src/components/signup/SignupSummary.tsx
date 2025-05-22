
import { motion } from "framer-motion";
import { AccountFormValues, PersonalInfoFormValues } from "./schemas";
import { SignupSummaryProps, container } from "./summary/types";
import SummaryHeader from "./summary/SummaryHeader";
import PhotosSection from "./summary/PhotosSection";
import AccountSection from "./summary/AccountSection";
import PersonalSection from "./summary/PersonalSection";
import ProfileDetailsSection from "./summary/ProfileDetailsSection";
import LifestyleSection from "./summary/LifestyleSection";
import SummaryActions from "./summary/SummaryActions";
import SummarySection from "./summary/SummarySection";

const SignupSummary = ({
  accountData,
  personalData,
  profileData,
  lifestyleData,
  profileImages,
  isLoading,
  onBack,
  onComplete,
}: SignupSummaryProps) => {
  return (
    <div className="space-y-6">
      <SummaryHeader />

      {/* Photo gallery preview */}
      {profileImages.length > 0 && (
        <PhotosSection profileImages={profileImages} />
      )}

      <motion.div
        className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Account Information */}
        <AccountSection accountData={accountData} />

        {/* Personal Information */}
        <PersonalSection personalData={personalData} />

        {/* Profile Details */}
        <ProfileDetailsSection profileData={profileData} />

        {/* Lifestyle Info */}
        <LifestyleSection lifestyleData={lifestyleData} />
      </motion.div>

      <SummaryActions 
        isLoading={isLoading} 
        onBack={onBack} 
        onComplete={onComplete}
      />
    </div>
  );
};

export default SignupSummary;
