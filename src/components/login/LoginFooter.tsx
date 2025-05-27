import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <footer className="w-full py-1 px-6 bg-black text-white border-t border-purple-300/20 z-50">
      <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center gap-2 text-xs" dir="rtl">
        
        {/* Navigation Links */}
        <p className="flex flex-wrap justify-center gap-4 font-medium">
          <Link to="/privacy" className="hover:text-purple-300 transition-all">פרטיות</Link>
          <Link to="/terms" className="hover:text-purple-300 transition-all">תנאים</Link>
          <Link to="/contact" className="hover:text-purple-300 transition-all">צור קשר</Link>
          <Link to="/about" className="hover:text-purple-300 transition-all">אודותינו</Link>
        </p>

        {/* Copyright with Logo */}
        <p className="text-xs text-white flex items-center justify-center gap-1">
          <span>
            © 2025 כל הזכויות שמורות ל <span className="font-semibold">AKHLADATE</span>
          </span>
          <img 
            src="../../src/assets/images/logo2.png" 
            alt="Logo" 
            className="h-4 w-4 object-contain drop-shadow-sm"
          />
        </p>
      </div>
    </footer>
  );
};

export default LoginFooter;
