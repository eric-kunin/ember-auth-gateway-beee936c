
import { Info } from "lucide-react";
import { capitalize } from "./types";
import { SummarySection } from "./SummarySection";

interface ProfileDetailsSectionProps {
  profileData: any;
}

const ProfileDetailsSection = ({ profileData }: ProfileDetailsSectionProps) => {
  return (
    <SummarySection 
      title="Profile Details"
      icon={<Info className="h-4 w-4" />}
    >
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
