
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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
            src="/lovable-uploads/101c11e0-73f1-4140-b100-53896f884b88.png" 
            alt="AkhlaDate Logo" 
            className="h-24 w-24 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      <div className="text-center z-10 mt-20">
        <h1 className="text-7xl font-bold mb-4 text-white">404</h1>
        <div className="w-16 h-1 mx-auto bg-theme-medium mb-8"></div>
        <p className="text-2xl text-theme-lightest mb-8 dark:text-theme-lighter">Oops! Page not found</p>
        <Button asChild className="bg-theme-medium hover:bg-theme-primary transition-all transform hover:translate-y-[-2px]">
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
