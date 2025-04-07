
const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Main background gradient - dark to black */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0205] via-[#10002B] to-black"></div>
      
      {/* Larger purple circle with fade */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#240046]/20 blur-3xl animate-pulse"></div>
      
      {/* Medium purple circle */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#3B185F]/15 blur-3xl"></div>
      
      {/* Small darker purple circle */}
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#2C1B47]/25 blur-3xl"></div>
      
      {/* Extra small accent circle */}
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-[#9D4EDD]/10 blur-3xl"></div>
      
      {/* Additional circles for more depth */}
      <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-[#470D82]/15 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-[#7B2CBF]/10 blur-3xl"></div>
    </div>
  );
};

export default BackgroundElements;
