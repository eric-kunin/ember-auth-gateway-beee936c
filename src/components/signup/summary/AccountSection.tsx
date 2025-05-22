
import { Mail } from "lucide-react";
import { AccountFormValues } from "../schemas";
import { item } from "./types";
import { SummarySection as Section } from "./SummarySectionProps";

interface AccountSectionProps {
  accountData: AccountFormValues;
}

const AccountSection = ({ accountData }: AccountSectionProps) => {
  return (
    <Section 
      title="Account Information"
      icon={<Mail className="h-4 w-4" />}
    >
      <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
        Email: {accountData.email}
      </p>
    </Section>
  );
};

export default AccountSection;
