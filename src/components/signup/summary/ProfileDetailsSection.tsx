
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
      
      {profileData.bio && (
        <div className="mb-3">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Bio:</span> {profileData.bio}
          </p>
        </div>
      )}
      
      {profileData.profession && (
        <div>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Profession:</span> {profileData.profession}
          </p>
        </div>
      )}
    </SummarySection>
  );
};

export default ProfileDetailsSection;
