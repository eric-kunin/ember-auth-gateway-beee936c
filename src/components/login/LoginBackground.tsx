
import { ReactNode } from "react";
import BackgroundElements from "@/components/login/BackgroundElements";
import UserCardsBackground from "@/components/login/UserCardsBackground";

interface LoginBackgroundProps {
  children: ReactNode;
}

const LoginBackground = ({ children }: LoginBackgroundProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] transition-colors duration-300 overflow-hidden">
      <BackgroundElements />
      <UserCardsBackground />
      <main className="flex-1 flex items-center justify-center relative z-20">
        <div className="relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LoginBackground;
