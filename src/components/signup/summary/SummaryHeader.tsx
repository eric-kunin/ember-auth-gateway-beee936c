
import { CheckCircle } from "lucide-react";

const SummaryHeader = () => {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-3">
        <CheckCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-medium text-[#240046] dark:text-white">
        Profile Summary
      </h3>
      <p className="text-sm text-[#3B185F]/70 dark:text-custom-lighter/70 mt-1">
        Review your information before completing the registration
      </p>
    </div>
  );
};

export default SummaryHeader;
