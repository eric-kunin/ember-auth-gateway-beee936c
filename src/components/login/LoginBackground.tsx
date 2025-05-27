
import { ReactNode } from "react";
import BackgroundElements from "@/components/login/BackgroundElements";
import UserCardsBackground from "@/components/login/UserCardsBackground";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";

interface LoginBackgroundProps {
  children: ReactNode;
}

const LoginBackground = ({ children }: LoginBackgroundProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#f8f4ff] via-[#f0e6ff] to-[#e8d5ff] dark:bg-[#1E0B36] transition-colors duration-300 overflow-hidden">
      <BackgroundElements />
      <LoginHeader />
      
      <main className="flex-1 flex items-center justify-center relative">
        
        {/* ✅ Fullscreen cards grid in background - now always visible */}
        <UserCardsBackground />
        {/* ✅ Background gradient below everything */}
        

        {/* ✅ Actual content above */}
        <div className="relative z-20 w-full flex justify-center items-center px-2 sm:px-4">
            {children}
        </div>
      </main>
        {/* ✅ Footer with links */}
      <LoginFooter />
    </div>
  );
};

export default LoginBackground;
