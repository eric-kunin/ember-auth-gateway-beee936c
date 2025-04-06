
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

// Step component for the step indicator
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div 
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i < currentStep ? "w-8 bg-[#9D4EDD]" : "w-4 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#10002B]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* App Logo Header */}
      <div className="absolute top-10 left-0 right-0 flex justify-center z-20">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
            alt="AkhlaDate Logo" 
            className="h-24 w-24 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      <div className="text-center z-10 mt-20 bg-[#1A001A]/70 backdrop-blur-lg border border-[#9D4EDD]/20 rounded-2xl p-8 w-80">
        <h1 className="text-7xl font-bold mb-4 text-white">404</h1>
        <div className="w-16 h-1 mx-auto bg-[#9D4EDD] mb-8"></div>
        <StepIndicator currentStep={1} totalSteps={3} />
        <p className="text-2xl text-[#E0AAFF] mb-8">Oops! Page not found</p>
        <Button asChild className="bg-[#9D4EDD] hover:bg-[#7B2CBF] transition-all transform hover:translate-y-[-2px]">
          <a href="/login">Return to Login</a>
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-theme-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-[15%] w-72 h-72 rounded-full bg-theme-medium/30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
