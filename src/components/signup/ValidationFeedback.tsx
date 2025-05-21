
import { Info } from "lucide-react";

interface ValidationFeedbackProps {
  message: string;
}

const ValidationFeedback = ({ message }: ValidationFeedbackProps) => {
  return (
    <div className="text-xs text-[#3B185F]/70 dark:text-custom-lighter/70 flex items-start space-x-1">
      <Info className="h-3 w-3 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ValidationFeedback;
