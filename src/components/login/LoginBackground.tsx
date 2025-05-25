
import { ReactNode } from "react";
import BackgroundElements from "@/components/login/BackgroundElements";
import UserCardsBackground from "@/components/login/UserCardsBackground";
import { useIsMobile } from "@/hooks/use-mobile";

interface LoginBackgroundProps {
  children: ReactNode;
}

const LoginBackground = ({ children }: LoginBackgroundProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#f8f4ff] via-[#f0e6ff] to-[#e8d5ff] dark:bg-[#1E0B36] transition-colors duration-300 overflow-hidden">
      <main className="flex-1 flex items-center justify-center relative">
        {/* ✅ Fullscreen cards grid in background */}
{!isMobile && (
  <div className="absolute inset-0 z-10 pointer-events-none">
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4 w-full h-full">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-xl h-80 min-w-[100px] shadow-md border border-white/20"
        />
      ))}
    </div>
  </div>
)}



        {/* ✅ Background gradient below everything */}
        <BackgroundElements />

        {/* ✅ Actual content above */}
        <div className="relative z-20 w-full flex justify-center items-center px-2 sm:px-4">
            {children}
        </div>
        </main>

    </div>
  );
};

export default LoginBackground;
