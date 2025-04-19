
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Heart } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#10002B] to-[#240046] transition-all duration-500">
      <div className="text-center z-10 mt-8 bg-black/60 backdrop-blur-xl border border-[#9D4EDD]/20 rounded-2xl p-8 w-96 transform hover:scale-105 transition-all duration-300 shadow-[0_8px_32px_rgba(157,78,221,0.15)] relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <h1 className="text-8xl font-bold mb-4 text-[#E0AAFF] animate-pulse">404</h1>
        <div className="w-16 h-1 mx-auto bg-[#9D4EDD] mb-8 animate-grow-line"></div>
        <StepIndicator currentStep={1} totalSteps={3} />
        <p className="text-2xl text-[#E0AAFF] mb-4 animate-fade-in">Connection Lost?</p>
        <p className="text-md text-[#C77DFF] mb-8 animate-fade-in">
          Seems like you've wandered into uncharted territory! 
          Let's guide you back to where the hearts connect.
        </p>
        
        <Button 
          asChild 
          className="bg-[#9D4EDD] hover:bg-[#7B2CBF] transition-all transform hover:translate-y-[-2px] hover:shadow-lg animate-fade-in flex gap-2 items-center mx-auto"
        >
          <a href="/login">
            <Heart className="h-4 w-4 text-pink-200 animate-pulse" />
            <span>Back to Love's Path</span>
          </a>
        </Button>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-[15%] w-80 h-80 rounded-full bg-[#9D4EDD]/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-[15%] w-96 h-96 rounded-full bg-[#7B2CBF]/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-[#E0AAFF]/5 blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default NotFound;
