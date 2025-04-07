
import { Button } from "@/components/ui/button";
import { Check, CheckCircle } from "lucide-react";

interface SignupCompleteProps {
  isLoading: boolean;
  handleComplete: () => void;
  handleBack: () => void;
}

const SignupComplete = ({
  isLoading,
  handleComplete,
  handleBack
}: SignupCompleteProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-[#240046] dark:text-white">
          You're Almost Done!
        </h2>
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter mt-2 max-w-xs">
          Please review your information before completing your registration.
        </p>
      </div>

      <div className="space-y-4">
        <ul className="space-y-3">
          <li className="flex items-center gap-2 text-[#3B185F] dark:text-custom-lighter">
            <Check className="h-5 w-5 text-green-500" />
            <span>Account credentials created</span>
          </li>
          <li className="flex items-center gap-2 text-[#3B185F] dark:text-custom-lighter">
            <Check className="h-5 w-5 text-green-500" />
            <span>Personal information added</span>
          </li>
          <li className="flex items-center gap-2 text-[#3B185F] dark:text-custom-lighter">
            <Check className="h-5 w-5 text-green-500" />
            <span>Privacy terms accepted</span>
          </li>
        </ul>

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleComplete}
            className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                     signin-button-hover transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Complete Sign Up"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupComplete;
