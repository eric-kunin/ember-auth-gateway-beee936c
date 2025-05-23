
import { ReactNode } from "react";
import BackgroundElements from "@/components/login/BackgroundElements";
import UserCardsBackground from "@/components/login/UserCardsBackground";

interface LoginBackgroundProps {
  children: ReactNode;
}

const LoginBackground = ({ children }: LoginBackgroundProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#1E0B36] transition-colors duration-300 overflow-hidden">
      <main className="flex-1 flex items-center justify-center relative z-10">
        <BackgroundElements />
        <UserCardsBackground />
        <div className="relative z-20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LoginBackground;
