import { Link, useLocation } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";
import LanguageSwitcher from "../LanguageSwitcher";

const LoginHeader = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <header
      className="w-full px-4 sm:px-6 py-2 flex items-center justify-between 
                 dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none 
                 border-b border-purple-300/30 dark:border-purple-300/20 
                 shadow-sm dark:shadow-none relative z-50"
      dir="rtl"
    >
      {/* Mobile: Auth button top-left */}
      <div className="absolute top-2 left-4 sm:static sm:order-3">
        {isSignupPage && (
          <Link
            to="/login"
            className="px-4 py-2 border border-[#9D4EDD] text-[#9D4EDD] 
                       hover:border-[#C77DFF] hover:text-[#C77DFF]
                       rounded-xl text-sm font-semibold transition-all duration-300"
          >
            התחברות
          </Link>
        )}

        {isLoginPage && (
          <Link
            to="/signup"
            className="px-4 py-2 border border-[#9D4EDD] text-[#9D4EDD] 
                       hover:border-[#C77DFF] hover:text-[#C77DFF]
                       rounded-xl text-sm font-semibold transition-all duration-300"
          >
            הרשמה
          </Link>
        )}

        {!isLoginPage && !isSignupPage && (
          <Link
            to="/login"
            className="px-4 py-2 text-purple-700 dark:text-purple-100 
                       hover:text-purple-900 dark:hover:text-white 
                       rounded-lg text-sm font-medium transition-all duration-300"
          >
            התחברות
          </Link>
        )}
      </div>

      {/* Centered logo + text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2  sm:static sm:translate-x-0 sm:translate-y-0 flex items-center gap-2">
        <Link to="/" className="flex items-center group">
          <img
            src={logo2}
            alt="Logo"
            className="h-10 w-10 object-contain drop-shadow-md"
          />
          <span
            className="ml-2 text-xl font-bold bg-gradient-to-r 
                       from-gray-800 to-purple-600 dark:from-white dark:to-purple-200 
                       bg-clip-text text-transparent"
          >
            AKHLADATE
          </span>
        </Link>
      </div>

      {/* Language switcher top-right */}
      <div className="absolute top-2 right-4 sm:static sm:order-2">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default LoginHeader;
