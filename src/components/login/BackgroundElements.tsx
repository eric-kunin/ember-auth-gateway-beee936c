
const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 transition-colors duration-500">
      {/* Main background gradient - changes between light and dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5efff] via-[#f8f2ff] to-[#ede1ff] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black transition-colors duration-500"></div>
      
      {/* Larger purple circle with fade */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#C77DFF]/15 dark:bg-[#240046]/20 blur-3xl animate-pulse transition-colors duration-500"></div>
      
      {/* Medium purple circle */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#E0AAFF]/20 dark:bg-[#3B185F]/15 blur-3xl transition-colors duration-500"></div>
      
      {/* Small darker purple circle */}
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#9D4EDD]/15 dark:bg-[#2C1B47]/25 blur-3xl transition-colors duration-500"></div>
      
      {/* Extra small accent circle */}
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-[#9D4EDD]/20 dark:bg-[#9D4EDD]/10 blur-3xl transition-colors duration-500"></div>
      
      {/* Additional circles for more depth */}
      <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-[#E0AAFF]/15 dark:bg-[#470D82]/15 blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-[#C77DFF]/15 dark:bg-[#7B2CBF]/10 blur-3xl transition-colors duration-500"></div>
    </div>
  );
};

export default BackgroundElements;
