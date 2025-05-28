
import { Link, useLocation } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";

const LoginHeader = () => {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup";
  
  return (
    <header className="w-full py-1 px-6 flex justify-between items-center z-50 
                    dark:bg-transparent 
                   backdrop-blur-md dark:backdrop-blur-none
                   border-b border-purple-300/30 dark:border-purple-300/20 
                   shadow-sm dark:shadow-none">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center group">
          <img 
            src={logo2} 
            alt="Logo" 
            className="h-14 w-14 object-contain drop-shadow-lg"
          />
          <span className="ml-3 text-xl font-bold bg-gradient-to-r 
                         from-gray-800 to-purple-600 dark:from-white dark:to-purple-200 
                         bg-clip-text text-transparent">
            AKHLADATE
          </span>
        </Link>

        {/* New phrase */}
        <span className="hidden lg:inline-block text-sm 
                       text-purple-700 dark:text-purple-100 
                       font-medium ml-6">
          מצא את החיבור שלך עם הודעה חינמית ראשונה 💜
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Large screens - show both buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-purple-700 dark:text-purple-100 
                     hover:text-purple-900 dark:hover:text-white 
                     transition-all duration-300 text-sm font-medium 
                     px-4 py-2 rounded-lg 
                     hover:bg-purple-100/50 dark:hover:bg-white/10 
                     hover:scale-105"
          >
            התחברות
          </Link>
          <Link 
            to="/signup" 
            className="px-6 py-2.5 border border-[#9D4EDD] text-[#9D4EDD] 
                     hover:border-[#C77DFF] hover:text-[#C77DFF]
                     bg-transparent rounded-xl transition-all duration-300 text-sm font-semibold 
                     shadow-none hover:shadow-purple-500/30 hover:scale-105 hover:-translate-y-0.5"
          >
            הרשמה
          </Link>
        </div>

        {/* Small screens - show only opposite page button */}
        <div className="md:hidden">
          {isSignupPage ? (
            <Link 
              to="/login" 
              className="text-purple-700 dark:text-purple-100 
                       hover:text-purple-900 dark:hover:text-white 
                       transition-all duration-300 text-sm font-medium 
                       px-4 py-2 rounded-lg 
                       hover:bg-purple-100/50 dark:hover:bg-white/10 
                       hover:scale-105"
            >
              התחברות
            </Link>
          ) : (
            <Link 
              to="/signup" 
              className="px-6 py-2.5 border border-[#9D4EDD] text-[#9D4EDD] 
                       hover:border-[#C77DFF] hover:text-[#C77DFF]
                       bg-transparent rounded-xl transition-all duration-300 text-sm font-semibold 
                       shadow-none hover:shadow-purple-500/30 hover:scale-105 hover:-translate-y-0.5"
            >
              הרשמה
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
