
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center z-50 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
            alt="Logo" 
            className="h-10 w-10 object-contain drop-shadow-lg"
          />
          <span className="ml-2 text-lg font-bold text-white dark:text-white">AkhlaDate</span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <Link 
          to="/about" 
          className="text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          אודותינו
        </Link>
        <Link 
          to="/features" 
          className="text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          תכונות
        </Link>
        <Link 
          to="/safety" 
          className="text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          בטיחות
        </Link>
        <Link 
          to="/contact" 
          className="text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          צור קשר
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link 
          to="/login" 
          className="text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          התחברות
        </Link>
        <Link 
          to="/signup" 
          className="px-4 py-2 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white rounded-lg transition-colors text-sm font-medium"
        >
          הרשמה
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
