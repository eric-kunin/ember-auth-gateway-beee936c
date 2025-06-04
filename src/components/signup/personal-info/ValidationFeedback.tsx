import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ValidationFeedbackProps {
  message: string;
}

const ValidationFeedback = ({ message }: ValidationFeedbackProps) => {
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";

  return (
    <div
      className={`text-xs text-[#3B185F]/70 dark:text-custom-lighter/70 flex items-start ${
        direction === "rtl" ? "space-x-reverse space-x-1" : "space-x-1"
      }`}
      dir={direction}
    >
      <Info className="h-3 w-3 mt-0.5 shrink-0" />
      <span className={`${direction === "rtl" ? "pl-1" : "pr-1"}`}>{message}</span>
    </div>
  );
};

export default ValidationFeedback;
