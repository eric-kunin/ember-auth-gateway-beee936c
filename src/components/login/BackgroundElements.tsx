
import { useIsMobile } from "@/hooks/use-mobile";

const BackgroundElements = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 overflow-hidden z-0 transition-colors duration-[2000ms]">
      {/* Enhanced main background gradient - much more vibrant for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3e8ff] via-[#e9d5ff] to-[#d8b4fe] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black transition-colors duration-[2000ms]"></div>
      
      {/* Additional colorful gradient overlay for light mode depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#fdf2f8]/50 via-[#f3e8ff]/30 to-[#e9d5ff]/60 dark:opacity-0 transition-all duration-[2000ms]"></div>
      
      {/* Secondary gradient for more color richness */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#fce7f3]/40 via-transparent to-[#ddd6fe]/50 dark:opacity-0 transition-all duration-[2000ms]"></div>
      
      {/* Larger purple circle with rich gradient for light mode */}
      <div className={`absolute -top-20 -left-20 ${isMobile ? 'w-64 h-64' : 'w-96 h-96'} rounded-full bg-gradient-to-br from-[#c084fc]/70 to-[#a855f7]/50 dark:bg-[#240046]/20 blur-3xl animate-pulse transition-colors duration-[2000ms]`}></div>
      
      {/* Medium purple circle with vibrant gradient */}
      <div className={`absolute top-1/4 right-1/4 ${isMobile ? 'w-48 h-48' : 'w-72 h-72'} rounded-full bg-gradient-to-bl from-[#d8b4fe]/80 to-[#c084fc]/60 dark:bg-[#3B185F]/15 blur-3xl transition-colors duration-[2000ms] ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Small purple circle with strong gradient */}
      <div className={`absolute bottom-10 right-10 ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} rounded-full bg-gradient-to-tl from-[#a855f7]/60 to-[#7c3aed]/45 dark:bg-[#2C1B47]/25 blur-3xl transition-colors duration-[2000ms]`}></div>
      
      {/* Pink accent circle for warmth and contrast */}
      <div className={`absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-[#f472b6]/60 to-[#c084fc]/50 dark:bg-[#9D4EDD]/10 blur-3xl transition-colors duration-[2000ms] ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Additional circles for more depth and color variation */}
      {!isMobile && (
        <>
          <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-gradient-to-br from-[#e9d5ff]/70 to-[#c084fc]/55 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-[#fce7f3]/70 to-[#d8b4fe]/60 dark:bg-[#7B2CBF]/10 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* New vibrant circles for enhanced visual interest */}
          <div className="absolute top-10 right-1/2 w-32 h-32 rounded-full bg-gradient-to-bl from-[#a855f7]/50 to-[#d8b4fe]/40 dark:bg-[#240046]/15 blur-2xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-1/2 left-10 w-52 h-52 rounded-full bg-gradient-to-tr from-[#f8bbdb]/60 to-[#e9d5ff]/50 dark:bg-[#3B185F]/20 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* Extra color elements for richness */}
          <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-gradient-to-bl from-[#ec4899]/40 to-[#a855f7]/35 dark:bg-[#240046]/10 blur-3xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-20 left-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-[#c084fc]/55 to-[#7c3aed]/40 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-[2000ms]"></div>
        </>
      )}
    </div>
  );
};

export default BackgroundElements;
