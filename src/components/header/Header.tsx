
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
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
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
