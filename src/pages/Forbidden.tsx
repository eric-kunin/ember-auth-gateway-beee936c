
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Forbidden = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "403 Error: Unauthorized access attempt:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C]">
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
      
      <div className="text-center z-10 mt-20 bg-[#1A001A]/70 backdrop-blur-lg border border-[#9D4EDD]/20 rounded-2xl p-8 w-96 transform hover:scale-105 transition-all duration-300">
        <h1 className="text-7xl font-bold mb-4 text-[#E0AAFF]">403</h1>
        <div className="w-16 h-1 mx-auto bg-[#9D4EDD] mb-8"></div>
        <p className="text-2xl text-[#E0AAFF] mb-4">Connection Blocked</p>
        <p className="text-md text-[#C77DFF] mb-8">
          Looks like Cupid's taking a break! This area is off-limits for now. 
          Maybe it's time to explore other paths to love?
        </p>
        <Button asChild className="bg-[#9D4EDD] hover:bg-[#7B2CBF] transition-all transform hover:translate-y-[-2px]">
          <a href="/login">Return to Love</a>
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 left-[20%] w-72 h-72 rounded-full bg-[#9D4EDD]/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-[20%] w-80 h-80 rounded-full bg-[#7B2CBF]/30 blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Forbidden;
