
import { useIsMobile } from "@/hooks/use-mobile";

const BackgroundElements = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 overflow-hidden z-0 transition-colors duration-500">
      {/* Enhanced main background gradient - more vibrant for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf7ff] via-[#f0e6ff] to-[#e8d5ff] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black transition-colors duration-500"></div>
      
      {/* Additional light mode gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#fff2f8]/30 via-transparent to-[#f0e6ff]/40 dark:opacity-0 transition-opacity duration-500"></div>
      
      {/* Larger purple circle with enhanced colors for light mode */}
      <div className={`absolute -top-20 -left-20 ${isMobile ? 'w-64 h-64' : 'w-96 h-96'} rounded-full bg-gradient-to-br from-[#e4d3ff]/60 to-[#c7a0ff]/40 dark:bg-[#240046]/20 blur-3xl animate-pulse transition-colors duration-500`}></div>
      
      {/* Medium purple circle with gradient - enhanced for light mode */}
      <div className={`absolute top-1/4 right-1/4 ${isMobile ? 'w-48 h-48' : 'w-72 h-72'} rounded-full bg-gradient-to-bl from-[#d8b4ff]/50 to-[#b088ff]/35 dark:bg-[#3B185F]/15 blur-3xl transition-colors duration-500 ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Small darker purple circle with gradient */}
      <div className={`absolute bottom-10 right-10 ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} rounded-full bg-gradient-to-tl from-[#c7a0ff]/45 to-[#9d4edd]/30 dark:bg-[#2C1B47]/25 blur-3xl transition-colors duration-500`}></div>
      
      {/* Extra small accent circle with pink tint for warmth */}
      <div className={`absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-[#ffd6e8]/40 to-[#e4c6ff]/35 dark:bg-[#9D4EDD]/10 blur-3xl transition-colors duration-500 ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Additional circles for more depth - enhanced for light mode */}
      {!isMobile && (
        <>
          <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-gradient-to-br from-[#f0e6ff]/50 to-[#d8b4ff]/35 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-500"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-[#ffe6f2]/45 to-[#e4c6ff]/40 dark:bg-[#7B2CBF]/10 blur-3xl transition-colors duration-500"></div>
          
          {/* New additional circles for more visual interest in light mode */}
          <div className="absolute top-10 right-1/2 w-32 h-32 rounded-full bg-gradient-to-bl from-[#c7a0ff]/30 to-[#e0aaff]/25 dark:bg-[#240046]/15 blur-2xl transition-colors duration-500"></div>
          <div className="absolute bottom-1/2 left-10 w-52 h-52 rounded-full bg-gradient-to-tr from-[#ffd6e8]/35 to-[#f0e6ff]/30 dark:bg-[#3B185F]/20 blur-3xl transition-colors duration-500"></div>
        </>
      )}
    </div>
  );
};

export default BackgroundElements;
