
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { AccountFormValues } from "../schemas";
import { item } from "./types";
import SummarySection from "./SummarySection";

interface AccountSectionProps {
  accountData: AccountFormValues;
}

const AccountSection = ({ accountData }: AccountSectionProps) => {
  return (
    <SummarySection className="bg-white/50 dark:bg-[#20003b]/50" variants={item}>
      <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
        <Mail className="h-4 w-4 mr-1 text-[#9D4EDD]" />
        Account Information
      </h4>
      <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
        Email: {accountData.email}
      </p>
    </SummarySection>
  );
};

export default AccountSection;
