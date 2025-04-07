
import { AlertCircle } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="text-center text-xs mb-6">
      <div className="flex items-center justify-center gap-1 py-2 px-3 rounded-md 
                     bg-[#f0e6ff]/80 dark:bg-[#240046]/30 
                     border border-[#9D4EDD]/20 dark:border-[#9D4EDD]/10">
        <AlertCircle className="h-3 w-3 text-[#240046]/70 dark:text-custom-lighter/70" /> 
        <span className="text-[#240046] dark:text-custom-lighter">
          Protected by reCAPTCHA and subject to the{" "}
          <a href="#" className="underline text-[#9D4EDD] hover:text-[#7B2CBF] dark:text-custom-lighter dark:hover:text-white">Privacy Policy</a> 
          {" "}and{" "}
          <a href="#" className="underline text-[#9D4EDD] hover:text-[#7B2CBF] dark:text-custom-lighter dark:hover:text-white">Terms of Service</a>
        </span>
      </div>
    </div>
  );
};

export default PrivacyNotice;
