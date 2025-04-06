
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-theme-dark via-theme-purple to-theme-main dark:from-[#0B0205] dark:via-[#1A1025] dark:to-[#2C1B47]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4 text-white">404</h1>
        <div className="w-16 h-1 mx-auto bg-theme-accent mb-8"></div>
        <p className="text-2xl text-theme-light mb-8 dark:text-gray-300">Oops! Page not found</p>
        <Button asChild className="bg-theme-accent hover:bg-theme-accent/90 transition-all transform hover:translate-y-[-2px]">
          <a href="/login">Return to Login</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
