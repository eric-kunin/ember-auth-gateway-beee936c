
import { User, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { PersonalInfoFormValues } from "../schemas";
import { SummarySection } from "./SummarySection";

interface PersonalSectionProps {
  personalData: PersonalInfoFormValues;
  profileData: { name: string; bio: string; profession: string };
}

const PersonalSection = ({ personalData, profileData }: PersonalSectionProps) => {
  return (
    <SummarySection 
      title="Personal Information"
      icon={<User className="h-4 w-4" />}
    >
      <div className="grid grid-cols-2 gap-4 pl-4">
        <div className="space-y-3 pl-4">
          <div className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Name:</span> 
            <span>{profileData.name}</span>
            <div className="flex items-center mt-1 text-xs text-[#9D4EDD]/70 dark:text-[#E0AAFF]/70">
              <EyeOff className="h-3 w-3 mr-1" />
              <span>Will not be shown until you allow it to be shown to others</span>
            </div>
          </div>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Nickname:</span> {personalData.nickname}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Gender:</span> {personalData.gender}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Birthdate:</span> {personalData.birthdate ? format(personalData.birthdate, 'PPP') : 'Not provided'}
          </p>
        </div>
      </div>
    </SummarySection>
  );
};

export default PersonalSection;
