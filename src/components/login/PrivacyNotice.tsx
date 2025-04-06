
import { AlertCircle } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="text-center text-xs mb-6">
      <div className="flex items-center justify-center gap-1 py-2 px-3 rounded-md bg-[#240046]/30">
        <AlertCircle className="h-3 w-3 text-custom-lighter/70" /> 
        <span className="text-custom-lighter">
          Protected by reCAPTCHA and subject to the{" "}
          <a href="#" className="underline text-custom-lighter hover:text-white">Privacy Policy</a> 
          {" "}and{" "}
          <a href="#" className="underline text-custom-lighter hover:text-white">Terms of Service</a>
        </span>
      </div>
    </div>
  );
};

export default PrivacyNotice;
