
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { item, capitalize } from "./types";
import SummarySection from "./SummarySection";

interface ProfileDetailsSectionProps {
  profileData: any;
}

const ProfileDetailsSection = ({ profileData }: ProfileDetailsSectionProps) => {
  return (
    <SummarySection className="bg-white/50 dark:bg-[#20003b]/50" variants={item}>
      <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
        <Info className="h-4 w-4 mr-1 text-[#9D4EDD]" />
        Profile Details
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Height:</span> {profileData.height || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Religion:</span> {capitalize(profileData.religion) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Smoking:</span> {capitalize(profileData.smokingStatus) || 'Not provided'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Eye color:</span> {capitalize(profileData.eyeColor) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Religious level:</span> {capitalize(profileData.religiousLevel) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Drinking:</span> {capitalize(profileData.drinkingStatus) || 'Not provided'}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
          <span className="text-[#9D4EDD] font-medium">Looking for:</span> {capitalize(profileData.lookingFor)} {profileData.lookingForGender ? `(${profileData.lookingForGender})` : ''}
        </p>
      </div>
      {profileData.bio && (
        <div className="mt-2">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Bio:</span> {profileData.bio}
          </p>
        </div>
      )}
      {profileData.profession && (
        <div className="mt-2">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Profession:</span> {profileData.profession}
          </p>
        </div>
      )}
    </SummarySection>
  );
};

export default ProfileDetailsSection;
