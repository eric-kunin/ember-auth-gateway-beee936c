
import { ReactNode } from "react";
import BackgroundElements from "@/components/login/BackgroundElements";
import UserCardsBackground from "@/components/login/UserCardsBackground";

interface LoginBackgroundProps {
  children: ReactNode;
}

const LoginBackground = ({ children }: LoginBackgroundProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] transition-colors duration-300">
      <main className="flex-1 flex items-center justify-center relative">
        <BackgroundElements />
        <UserCardsBackground />
        {children}
      </main>
    </div>
  );
};

export default LoginBackground;
