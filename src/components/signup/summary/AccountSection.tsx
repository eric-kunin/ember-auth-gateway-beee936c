
import { Mail } from "lucide-react";
import { AccountFormValues } from "../schemas";
import { item } from "./types";
import { SummarySection } from "./SummarySection";

interface AccountSectionProps {
  accountData: AccountFormValues;
}

const AccountSection = ({ accountData }: AccountSectionProps) => {
  return (
    <SummarySection 
      title="Account Information"
      icon={<Mail className="h-4 w-4" />}
    >
      <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
        <span className="text-[#9D4EDD] font-bold mr-1.5">Email:</span> {accountData.email}
      </p>
    </SummarySection>
  );
};

export default AccountSection;
