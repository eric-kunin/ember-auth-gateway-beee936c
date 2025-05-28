
import { Link } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";

const LoginFooter = () => {
  return (
    <footer className="w-full py-1 px-6 
                      dark:bg-black 
                     text-gray-800 dark:text-white 
                     border-t border-purple-300/30 dark:border-purple-300/20 
                     backdrop-blur-md dark:backdrop-blur-none
                     shadow-sm dark:shadow-none z-50">
      <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center gap-2 text-xs" dir="rtl">
        
        {/* Navigation Links */}
        <p className="flex flex-wrap justify-center gap-4 font-medium">
          <Link 
            to="/privacy" 
            className="text-purple-700 dark:text-white 
                     hover:text-purple-900 dark:hover:text-purple-300 
                     transition-all duration-300"
          >
            פרטיות
          </Link>
          <Link 
            to="/terms" 
            className="text-purple-700 dark:text-white 
                     hover:text-purple-900 dark:hover:text-purple-300 
                     transition-all duration-300"
          >
            תנאים
          </Link>
          <Link 
            to="/contact" 
            className="text-purple-700 dark:text-white 
                     hover:text-purple-900 dark:hover:text-purple-300 
                     transition-all duration-300"
          >
            צור קשר
          </Link>
          <Link 
            to="/about" 
            className="text-purple-700 dark:text-white 
                     hover:text-purple-900 dark:hover:text-purple-300 
                     transition-all duration-300"
          >
            אודותינו
          </Link>
        </p>

        {/* Copyright with Logo */}
        <p className="text-xs text-gray-700 dark:text-white flex items-center justify-center gap-1">
          <span>
            © 2025 כל הזכויות שמורות ל <span className="font-semibold">AKHLADATE</span>
          </span>
          <img 
            src={logo2} 
            alt="Logo" 
            className="h-4 w-4 object-contain drop-shadow-sm"
          />
        </p>
      </div>
    </footer>
  );
};

export default LoginFooter;
