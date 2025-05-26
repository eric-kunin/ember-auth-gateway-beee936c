
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <header className="w-full py-6 px-6 flex justify-between items-center z-50 
                     backdrop-blur-lg border-b border-purple-300/20 shadow-lg">
      <div className="flex items-center">
        <Link to="/" className="flex items-center group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] shadow-xl">
            <img 
              src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
              alt="Logo" 
              className="h-8 w-8 object-contain drop-shadow-lg"
            />
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            AkhlaDate
          </span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link 
          to="/about" 
          className="text-purple-100 hover:text-white transition-all duration-300 text-sm font-medium 
                   hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 
                   after:bg-gradient-to-r after:from-[#9D4EDD] after:to-[#C77DFF] after:left-0 after:bottom-[-4px] 
                   after:transition-all after:duration-300 hover:after:w-full"
        >
          אודותינו
        </Link>
        <Link 
          to="/features" 
          className="text-purple-100 hover:text-white transition-all duration-300 text-sm font-medium 
                   hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 
                   after:bg-gradient-to-r after:from-[#9D4EDD] after:to-[#C77DFF] after:left-0 after:bottom-[-4px] 
                   after:transition-all after:duration-300 hover:after:w-full"
        >
          תכונות
        </Link>
        <Link 
          to="/safety" 
          className="text-purple-100 hover:text-white transition-all duration-300 text-sm font-medium 
                   hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 
                   after:bg-gradient-to-r after:from-[#9D4EDD] after:to-[#C77DFF] after:left-0 after:bottom-[-4px] 
                   after:transition-all after:duration-300 hover:after:w-full"
        >
          בטיחות
        </Link>
        <Link 
          to="/contact" 
          className="text-purple-100 hover:text-white transition-all duration-300 text-sm font-medium 
                   hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 
                   after:bg-gradient-to-r after:from-[#9D4EDD] after:to-[#C77DFF] after:left-0 after:bottom-[-4px] 
                   after:transition-all after:duration-300 hover:after:w-full"
        >
          צור קשר
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link 
          to="/login" 
          className="text-purple-100 hover:text-white transition-all duration-300 text-sm font-medium 
                   px-4 py-2 rounded-lg hover:bg-white/10 hover:scale-105"
        >
          התחברות
        </Link>
        <Link 
          to="/signup" 
          className="px-6 py-2.5 bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] hover:from-[#7B2CBF] hover:to-[#9D4EDD] 
                   text-white rounded-xl transition-all duration-300 text-sm font-semibold 
                   shadow-lg hover:shadow-purple-500/30 hover:scale-105 hover:-translate-y-0.5"
        >
          הרשמה
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
