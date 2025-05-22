
import { User } from "lucide-react";
import { format } from "date-fns";
import { PersonalInfoFormValues } from "../schemas";
import { SummarySection } from "./SummarySection";

interface PersonalSectionProps {
  personalData: PersonalInfoFormValues;
}

const PersonalSection = ({ personalData }: PersonalSectionProps) => {
  return (
    <SummarySection 
      title="Personal Information"
      icon={<User className="h-4 w-4" />}
    >
      <div className="grid grid-cols-2 gap-3 pl-3">
        <div className="space-y-2.5">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Name:</span> {personalData.name}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Gender:</span> {personalData.gender}
          </p>
        </div>
        <div className="space-y-2.5">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Birthdate:</span> {personalData.birthdate ? format(personalData.birthdate, 'PPP') : 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Phone:</span> {personalData.phone || 'Not provided'}
          </p>
        </div>
      </div>
    </SummarySection>
  );
};

export default PersonalSection;
