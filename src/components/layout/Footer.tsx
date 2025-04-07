
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-4 px-6 mt-auto bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-custom-lighter">© 2025 AkhlaDate. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-sm text-custom-lighter hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-custom-lighter hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/contact" className="text-sm text-custom-lighter hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
