
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/components/ThemeProvider";

const BackgroundElements = () => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  
  return (
    <div className="absolute inset-0 overflow-hidden z-0 transition-colors duration-500">
      {/* Main background gradient - changes between light and dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black transition-colors duration-500"></div>
      
      {/* Larger circle with fade - reduced size on mobile */}
      <div className={`absolute -top-20 -left-20 ${isMobile ? 'w-64 h-64' : 'w-96 h-96'} rounded-full ${isLightMode ? 'bg-blue-200/20' : 'bg-[#240046]/20'} blur-3xl animate-pulse transition-colors duration-500`}></div>
      
      {/* Medium circle - hidden on very small screens */}
      <div className={`absolute top-1/4 right-1/4 ${isMobile ? 'w-48 h-48' : 'w-72 h-72'} rounded-full ${isLightMode ? 'bg-indigo-100/15' : 'bg-[#3B185F]/15'} blur-3xl transition-colors duration-500 ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Small darker circle */}
      <div className={`absolute bottom-10 right-10 ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} rounded-full ${isLightMode ? 'bg-blue-300/10' : 'bg-[#2C1B47]/25'} blur-3xl transition-colors duration-500`}></div>
      
      {/* Extra small accent circle - hidden on very small screens */}
      <div className={`absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full ${isLightMode ? 'bg-indigo-200/15' : 'bg-[#9D4EDD]/10'} blur-3xl transition-colors duration-500 ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Additional circles for more depth - hidden on mobile */}
      {!isMobile && (
        <>
          <div className={`absolute top-1/2 left-1/4 w-60 h-60 rounded-full ${isLightMode ? 'bg-blue-100/15' : 'bg-[#470D82]/15'} blur-3xl transition-colors duration-500`}></div>
          <div className={`absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full ${isLightMode ? 'bg-indigo-300/10' : 'bg-[#7B2CBF]/10'} blur-3xl transition-colors duration-500`}></div>
        </>
      )}
    </div>
  );
};

export default BackgroundElements;
