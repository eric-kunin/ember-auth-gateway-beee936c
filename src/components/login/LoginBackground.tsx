
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import UserCardsBackground from "./UserCardsBackground";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";

interface LoginBackgroundProps {
  children: React.ReactNode;
}

const BackgroundElements = () => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 overflow-hidden z-0 transition-colors duration-1000 ease-in-out">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#f9f4ff] via-[#f4e9ff] to-[#ebdbff] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black duration-1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Animated Circles */}
      {[
        {
          className: `-top-20 -left-20 ${isMobile ? "w-64 h-64" : "w-96 h-96"}`,
          bgLight: "bg-[#d8b4ff]/30",
          bgDark: "dark:bg-[#240046]/20",
        },
        {
          className: `top-1/4 right-1/4 ${isMobile ? "w-48 h-48" : "w-72 h-72"} ${isMobile ? "hidden sm:block" : ""}`,
          bgLight: "bg-[#c7a0ff]/25",
          bgDark: "dark:bg-[#3B185F]/15",
        },
        {
          className: `bottom-10 right-10 ${isMobile ? "w-40 h-40" : "w-64 h-64"}`,
          bgLight: "bg-[#b088ff]/20",
          bgDark: "dark:bg-[#2C1B47]/25",
        },
        {
          className: `bottom-1/3 left-1/3 w-48 h-48 ${isMobile ? "hidden sm:block" : ""}`,
          bgLight: "bg-[#d9a6ff]/25",
          bgDark: "dark:bg-[#9D4EDD]/10",
        },
        {
          className: `top-[-80px] left-1/2 -translate-x-1/2 ${isMobile ? "w-40 h-40" : "w-72 h-72"}`,
          bgLight: "bg-[#ffcccc]/40",
          bgDark: "dark:bg-[#ff4d6d]/20",
        },
      ].map(({ className, bgLight, bgDark }, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
          className={`absolute rounded-full blur-3xl ${className} ${bgLight} ${bgDark} transition-colors duration-1000`}
        />
      ))}

      {/* Extra depth - only on desktop */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-[#bc95ff]/20 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-1000"
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-[#e4c6ff]/30 dark:bg-[#7B2CBF]/10 blur-3xl transition-colors duration-1000"
          />
        </>
      )}
    </div>
  );
};

const LoginBackground = ({ children }: LoginBackgroundProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f9f4ff] dark:bg-[#0B0205] transition-colors duration-1000">
      <LoginHeader />
      
      <div className="flex-1 relative flex items-center justify-center">
        <BackgroundElements />
        <UserCardsBackground />
        {children}
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default LoginBackground;
