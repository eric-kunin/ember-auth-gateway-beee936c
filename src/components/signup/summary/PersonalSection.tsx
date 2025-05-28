
import { User } from "lucide-react";
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
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Name:</span> {profileData.name}
          </p>
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
