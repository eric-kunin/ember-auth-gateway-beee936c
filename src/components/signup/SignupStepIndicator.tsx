
import { FC } from "react";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const SignupStepIndicator: FC<SignupStepIndicatorProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  // Calculate the progress width for the green line
  const calculateProgressWidth = () => {
    // For step 1, no progress line
    if (currentStep === 1) return "0%";
    
    // For step 2, show full progress from step 1 to 2
    if (currentStep === 2) return "50%";
    
    // For step 3, show full progress
    if (currentStep === 3) return "100%";
    
    return "0%";
  };

  // Calculate position for the progress line
  const calculatePosition = () => {
    if (currentStep === 1) {
      return { left: '50%', transform: 'translateX(-100%)' };
    } else if (currentStep === 2) {
      return { left: '25%', transform: 'translateX(0)' };
    } else {
      return { left: '50%', transform: 'translateX(-50%)' };
    }
  };

  const position = calculatePosition();

  return (
    <div className="flex justify-center items-center mb-4 relative">
      {/* Connecting lines */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-0.5 bg-gray-300 dark:bg-gray-700 z-0"></div>
      
      {/* Green progress line */}
      <div 
        className="absolute top-1/2 h-0.5 bg-green-500 z-[1] transition-all duration-500 ease-in-out"
        style={{ 
          width: calculateProgressWidth(),
          left: position.left,
          transform: position.transform
        }}
      ></div>
      
      {/* Step circles */}
      <div className="flex justify-between w-full relative z-[2]">
        {steps.map((step) => (
          <div 
            key={step} 
            className={`flex items-center justify-center rounded-full w-8 h-8 text-white
              ${step === currentStep 
                ? "bg-green-500 border-2 border-white dark:border-[#10002B] shadow-lg scale-110" 
                : step < currentStep 
                ? "bg-green-500" 
                : "bg-gray-300 dark:bg-gray-700"} 
              transition-all duration-300 ease-in-out relative`}
            title={`Step ${step}`}
          >
            <span>{step}</span>
            {step === currentStep && (
              <div className="absolute -inset-1 rounded-full border-2 border-green-300 dark:border-green-700 animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignupStepIndicator;
