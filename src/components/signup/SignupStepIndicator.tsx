import { FC } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const SignupStepIndicator: FC<SignupStepIndicatorProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const { t } = useTranslation();

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const calculateProgressWidth = () => {
    if (currentStep === 1) return "0%";
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return `${progress}%`;
  };

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1: return t("signupSteps.account");
      case 2: return t("signupSteps.basic");
      case 3: return t("signupSteps.birthday");
      case 4: return t("signupSteps.profile");
      case 5: return t("signupSteps.physical");
      case 6: return t("signupSteps.lifestyle");
      case 7: return t("signupSteps.photos");
      case 8: return t("signupSteps.summary");
      default: return step.toString();
    }
  };

  return (
    <div className="flex justify-center items-center mb-6 relative">
      {/* Background line */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-0.5 bg-gray-300 dark:bg-gray-700 z-0" />
      
      {/* Green progress line */}
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-green-500 z-[1] transition-all duration-500 ease-in-out"
        style={{ width: calculateProgressWidth() }}
      />

      <div className="flex justify-between w-full relative z-[2]">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center group">
            <div 
              className={`flex items-center justify-center rounded-full w-8 h-8 text-white
                ${step === currentStep 
                  ? "bg-green-500 border-2 border-white dark:border-[#10002B] shadow-lg scale-110" 
                  : step < currentStep 
                  ? "bg-green-500" 
                  : "bg-gray-300 dark:bg-gray-700"} 
                transition-all duration-300 ease-in-out relative`}
              title={`${t("signupSteps.step")} ${step}: ${getStepLabel(step)}`}
            >
              {step < currentStep ? (
                <Check className="h-5 w-5 stroke-[3]" />
              ) : (
                <span>{step}</span>
              )}
              {step === currentStep && (
                <div className="absolute -inset-1 rounded-full border-2 border-green-300 dark:border-green-700 animate-pulse"></div>
              )}
            </div>

            <span className={`text-xs mt-1 hidden sm:block 
              ${step === currentStep 
                ? "text-green-500 font-medium"
                : step < currentStep
                ? "text-green-500" 
                : "text-gray-500 dark:text-gray-400"}`}>
              {getStepLabel(step)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignupStepIndicator;
