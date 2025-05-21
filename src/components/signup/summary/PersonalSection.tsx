
import { User, Calendar, Phone } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { PersonalInfoFormValues } from "../schemas";
import { item } from "./types";
import SummarySection from "./SummarySection";

interface PersonalSectionProps {
  personalData: PersonalInfoFormValues;
}

const PersonalSection = ({ personalData }: PersonalSectionProps) => {
  return (
    <SummarySection className="bg-white/30 dark:bg-[#20003b]/30" variants={item}>
      <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
        <User className="h-4 w-4 mr-1 text-[#9D4EDD]" />
        Personal Information
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Name:</span> {personalData.name}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Gender:</span> {personalData.gender}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Birthdate:</span> {personalData.birthdate ? format(personalData.birthdate, 'PPP') : 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium">Phone:</span> {personalData.phone || 'Not provided'}
          </p>
        </div>
      </div>
    </SummarySection>
  );
};

export default PersonalSection;
