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
      
      {/* Larger purple circle with softer gradient for light mode - CHANGED TO ROSE */}
      <div className={`absolute -top-20 -left-20 ${isMobile ? 'w-64 h-64' : 'w-96 h-96'} rounded-full bg-gradient-to-br from-rose-300/50 to-rose-500/35 dark:bg-[#240046]/20 blur-3xl animate-pulse transition-colors duration-[2000ms]`}></div>
      
      {/* Medium purple circle with elegant gradient - CHANGED TO ROSE */}
      <div className={`absolute top-1/4 right-1/4 ${isMobile ? 'w-48 h-48' : 'w-72 h-72'} rounded-full bg-gradient-to-bl from-rose-200/60 to-rose-400/45 dark:bg-[#3B185F]/15 blur-3xl transition-colors duration-[2000ms] ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Small purple circle with refined gradient - CHANGED TO ROSE */}
      <div className={`absolute bottom-10 right-10 ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} rounded-full bg-gradient-to-tl from-rose-400/45 to-rose-600/30 dark:bg-[#2C1B47]/25 blur-3xl transition-colors duration-[2000ms]`}></div>
      
      {/* Pink accent circle for warmth and contrast - CHANGED TO ROSE */}
      <div className={`absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-rose-300/45 to-rose-500/35 dark:bg-[#9D4EDD]/10 blur-3xl transition-colors duration-[2000ms] ${isMobile ? 'hidden sm:block' : ''}`}></div>
      
      {/* Additional circles for more depth and color variation */}
      {!isMobile && (
        <>
          <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-gradient-to-br from-rose-200/50 to-rose-400/40 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-rose-100/55 to-rose-300/45 dark:bg-[#7B2CBF]/10 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* New refined circles for enhanced visual interest - CHANGED TO ROSE */}
          <div className="absolute top-10 right-1/2 w-32 h-32 rounded-full bg-gradient-to-bl from-rose-400/35 to-rose-200/25 dark:bg-[#240046]/15 blur-2xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-1/2 left-10 w-52 h-52 rounded-full bg-gradient-to-tr from-rose-300/45 to-rose-100/35 dark:bg-[#3B185F]/20 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* Extra color elements for richness - CHANGED TO ROSE */}
          <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-gradient-to-bl from-rose-500/30 to-rose-400/25 dark:bg-[#240046]/10 blur-3xl transition-colors duration-[2000ms]"></div>
          <div className="absolute bottom-20 left-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-rose-400/40 to-rose-600/25 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-[2000ms]"></div>
          
          {/* ALL EXISTING LIGHT MODE GRADIENT CIRCLES - CHANGED TO ROSE */}
          <div className="absolute top-1/5 left-2/3 w-56 h-56 rounded-full bg-gradient-to-br from-rose-200/50 to-rose-400/35 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-1/5 right-2/3 w-48 h-48 rounded-full bg-gradient-to-tl from-rose-100/55 to-rose-300/40 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-2/3 left-1/5 w-40 h-40 rounded-full bg-gradient-to-tr from-rose-300/45 to-rose-500/30 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-1/6 right-1/5 w-38 h-38 rounded-full bg-gradient-to-bl from-rose-200/40 to-rose-400/28 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-1/6 left-1/6 w-42 h-42 rounded-full bg-gradient-to-r from-rose-100/48 to-rose-300/32 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-3/4 right-1/6 w-34 h-34 rounded-full bg-gradient-to-tl from-rose-300/42 to-rose-500/28 dark:opacity-0 blur-xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-2/5 right-1/2 w-50 h-50 rounded-full bg-gradient-to-br from-rose-200/45 to-rose-400/35 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-1/8 left-1/3 w-46 h-46 rounded-full bg-gradient-to-bl from-rose-100/50 to-rose-300/38 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          
          {/* EXISTING ROSE-700 THEMED CIRCLES - KEEPING AS IS */}
          <div className="absolute top-1/10 right-1/3 w-52 h-52 rounded-full bg-gradient-to-br from-rose-700/30 to-rose-400/20 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-1/10 left-2/5 w-44 h-44 rounded-full bg-gradient-to-tl from-rose-600/25 to-rose-300/30 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-2/5 right-1/6 w-38 h-38 rounded-full bg-gradient-to-tr from-rose-500/35 to-rose-200/25 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-3/5 left-1/8 w-46 h-46 rounded-full bg-gradient-to-bl from-rose-400/40 to-rose-200/30 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-4/5 left-3/5 w-40 h-40 rounded-full bg-gradient-to-r from-rose-700/25 to-rose-300/35 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-1/7 left-1/7 w-36 h-36 rounded-full bg-gradient-to-tl from-rose-600/30 to-rose-200/25 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-1/7 right-1/7 w-42 h-42 rounded-full bg-gradient-to-br from-rose-500/28 to-rose-200/32 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-3/7 right-2/5 w-48 h-48 rounded-full bg-gradient-to-bl from-rose-700/22 to-rose-400/28 dark:opacity-0 blur-3xl transition-all duration-[2000ms]"></div>
        </>
      )}
      
      {/* Additional mobile-friendly light mode circles with rose colors */}
      {isMobile && (
        <>
          <div className="absolute top-1/3 right-1/5 w-32 h-32 rounded-full bg-gradient-to-br from-rose-200/45 to-rose-400/30 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-36 h-36 rounded-full bg-gradient-to-tl from-rose-100/50 to-rose-300/35 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-3/5 left-1/6 w-28 h-28 rounded-full bg-gradient-to-tr from-rose-300/40 to-rose-500/25 dark:opacity-0 blur-xl transition-all duration-[2000ms]"></div>
          
          {/* Rose-themed mobile circles - KEEPING AS IS */}
          <div className="absolute top-1/5 right-1/4 w-30 h-30 rounded-full bg-gradient-to-br from-rose-600/35 to-rose-300/25 dark:opacity-0 blur-2xl transition-all duration-[2000ms]"></div>
          <div className="absolute bottom-2/5 left-1/5 w-34 h-34 rounded-full bg-gradient-to-tl from-rose-500/30 to-rose-300/35 dark:opacity-0 blur-xl transition-all duration-[2000ms]"></div>
          <div className="absolute top-4/5 right-1/6 w-26 h-26 rounded-full bg-gradient-to-tr from-rose-700/25 to-rose-200/30 dark:opacity-0 blur-xl transition-all duration-[2000ms]"></div>
        </>
      )}
    </div>
  );
};

export default BackgroundElements;
