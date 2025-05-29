
import { useIsMobile } from "@/hooks/use-mobile";

const BackgroundElements = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 overflow-hidden z-0 transition-colors duration-[2000ms]">
      {/* Enhanced main background gradient - softer and more elegant for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf7ff] via-[#f1ebff] to-[#e8d9ff] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black transition-colors duration-[2000ms]"></div>
      
      {/* Additional colorful gradient overlay for light mode depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#fcf9ff]/60 via-[#f6efff]/40 to-[#ede2ff]/70 dark:opacity-0 transition-all duration-[2000ms]"></div>
      
      {/* Secondary gradient for more color richness */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#fdf9ff]/50 via-transparent to-[#e4d7ff]/60 dark:opacity-0 transition-all duration-[2000ms]"></div>
      
      {/* Larger purple circle with softer gradient for light mode */}
      <div className={`absolute -top-20 -left-20 ${isMobile ? 'w-64 h-64' : 'w-96 h-96'} rounded-full bg-gradient-to-br from-[#d1b3ff]/50 to-[#b894ff]/35 dark:bg-[#240046]/20 blur-3xl animate-pulse transition-colors duration-[2000ms]`}></div>
      
      {/* Medium purple circle with elegant gradient */}
      <div className={`absolute top-1/4 right-1/4 ${isMobile ? 'w-48 h-48' : 'w-72 h-72'} rounded-full bg-gradient-to-bl from-[#e0c4ff]/60 to-[#d1b3ff]/45 dark:bg-[#3B185F]/15 blur-3xl transition-colors duration-[2000ms] ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Small purple circle with refined gradient */}
      <div className={`absolute bottom-10 right-10 ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} rounded-full bg-gradient-to-tl from-[#b894ff]/45 to-[#9b7aff]/30 dark:bg-[#2C1B47]/25 blur-3xl transition-colors duration-[2000ms]`}></div>
      
      {/* Pink accent circle for warmth and contrast - softer in light mode */}
      <div className={`absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-[#f5b8d4]/45 to-[#d1b3ff]/35 dark:bg-[#9D4EDD]/10 blur-3xl transition-colors duration-[2000ms] ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Additional circles for more depth and color variation */}
      {!isMobile && (
        <>
          <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-gradient-to-br from-[#ede2ff]/50 to-[#d1b3ff]/40 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-[#fcf2ff]/55 to-[#e0c4ff]/45 dark:bg-[#7B2CBF]/10 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* New refined circles for enhanced visual interest */}
          <div className="absolute top-10 right-1/2 w-32 h-32 rounded-full bg-gradient-to-bl from-[#b894ff]/35 to-[#e0c4ff]/25 dark:bg-[#240046]/15 blur-2xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-1/2 left-10 w-52 h-52 rounded-full bg-gradient-to-tr from-[#f8d7f1]/45 to-[#ede2ff]/35 dark:bg-[#3B185F]/20 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* Extra color elements for richness - more subtle in light mode */}
          <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-gradient-to-bl from-[#f0a3c7]/30 to-[#b894ff]/25 dark:bg-[#240046]/10 blur-3xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-20 left-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-[#d1b3ff]/40 to-[#9b7aff]/25 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-[2000ms]"></div>
        </>
      )}
    </div>
  );
};

export default BackgroundElements;
