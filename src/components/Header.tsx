
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Star,
  User,
  Search,
  Gem,
  Info,
  Clock,
  Wallet,
  Settings,
  LogOut,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo2 from '../assets/images/logo2.png';
import { useTheme } from './ThemeProvider';

const Tooltip = ({ text }) => (
  <motion.div 
    initial={{ opacity: 0, y: 5 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: 5 }} 
    className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#392467] text-white rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2 text-sm z-50"
  >
    <span>{text}</span>
    <Info className="w-4 h-4 text-[#FFD1E3]" />
    <div className="absolute top-full right-4 transform -translate-x-1/2 w-2 h-2 bg-[#392467] rotate-45"></div>
  </motion.div>
);

const ProfileDropdown = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full right-0 mt-2 w-48 bg-[#392467] rounded-xl shadow-xl border border-[#A367B1]/20 overflow-hidden z-50"
        >
          <div className="py-2">
            <button 
              onClick={() => {}} 
              className="w-full px-4 py-2 text-white hover:bg-[#A367B1]/20 flex items-center gap-2 text-sm"
            >
              <Settings className="w-4 h-4" />
              הגדרות
            </button>
            <button 
              onClick={() => {}} 
              className="w-full px-4 py-2 text-white hover:bg-[#A367B1]/20 flex items-center gap-2 text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              תמיכה
            </button>
            <button 
              onClick={toggleTheme} 
              className="w-full px-4 py-2 text-white hover:bg-[#A367B1]/20 flex items-center gap-2 text-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4" />
                  מצב יום
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  מצב לילה
                </>
              )}
            </button>
            <div className="my-1 border-t border-[#A367B1]/20"></div>
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 text-red-400 hover:bg-[#A367B1]/20 flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              התנתק
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [hovered, setHovered] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-[#0B0205] via-[#2C1B47] to-[#0B0205] border-b border-[#A367B1]/20">
      <div className="w-full max-w-[1400px] mx-auto px-12 py-4">
        <div className="flex items-center">
          {/* Left - Logo */}
          <div className="flex items-center gap-2 flex-1 justify-start pl-8">
            <div className="w-11 h-11 relative">
              <img 
                src={logo2}
                alt="AhellaDate Logo" 
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <span className="font-comfortaa text-[#FFD1E3] font-bold text-2xl tracking-wider">
              AKHLADATE
            </span>
          </div>

          {/* Center - Timer & Limits */}
          <div className="flex items-center gap-8 flex-1 justify-center">
            {/* Max Messages */}
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#FFD1E3]" />
              <div className="flex flex-col items-end">
                <span className="text-xs text-white/70">הודעות שנותרו</span>
                <span className="font-medium text-white">12/20</span>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 bg-[#392467] px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-[#FFD1E3]" />
              <span className="text-white font-medium">2h</span>
            </div>

            {/* Max Hearts */}
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#FFD1E3]" />
              <div className="flex flex-col items-end">
                <span className="text-xs text-white/70">לייקים שנותרו</span>
                <span className="font-medium text-white">5/10</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6 flex-1 justify-end pr-8">
            {/* Balance */}
            <div className="flex items-center gap-2 bg-[#392467] px-4 py-2 rounded-lg">
              <Wallet className="w-5 h-5 text-[#FFD1E3]" />
              <span className="text-emerald-500 font-medium">₪155</span>
            </div>

            {/* Messages */}
            <motion.div 
              className="relative cursor-pointer"
              onMouseEnter={() => setHovered('messages')}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-7 h-7 text-white/80 hover:text-[#FFD1E3] transition-colors" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#A367B1] rounded-full flex items-center justify-center">
                <span className="text-[11px] font-bold text-white">3</span>
              </div>
              <AnimatePresence>
                {hovered === 'messages' && <Tooltip text="אלה המשתמשים ששלחו לך הודעה" />}
              </AnimatePresence>
            </motion.div>

            {/* Hearts */}
            <motion.div 
              className="relative cursor-pointer"
              onMouseEnter={() => setHovered('likes')}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-7 h-7 text-white/80 hover:text-[#FFD1E3] transition-colors" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#A367B1] rounded-full flex items-center justify-center">
                <span className="text-[11px] font-bold text-white">2</span>
              </div>
              <AnimatePresence>
                {hovered === 'likes' && <Tooltip text="אלה המשתמשים שאהבו אותך" />}
              </AnimatePresence>
            </motion.div>

            {/* Star Rating */}
            <motion.div 
              className="relative cursor-pointer"
              onMouseEnter={() => setHovered('views')}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-7 h-7 text-[#FFD1E3] fill-[#FFD1E3]" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#392467] border border-[#FFD1E3] rounded-full flex items-center justify-center">
                <span className="text-[11px] font-bold text-[#FFD1E3]">2</span>
              </div>
              <AnimatePresence>
                {hovered === 'views' && <Tooltip text="אלה המשתמשים שצפו בך" />}
              </AnimatePresence>
            </motion.div>

            {/* Search */}
            <motion.button 
              className="text-white/80 hover:text-[#FFD1E3] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-7 h-7" />
            </motion.button>

            {/* Profile */}
            <motion.div 
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5D3587] to-[#A367B1] p-[2px]">
                <img 
                  src="https://i.pinimg.com/736x/bc/13/e5/bc13e566c79f4a0c44bcef1a3ddd7a5e.jpg"
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0B0205]"></div>
              <ProfileDropdown 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
              />
            </motion.div>

            {/* Premium Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: '#FFE4EE',
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-[#FFD1E3] text-[#392467] rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-[#FFD1E3]/20"
            >
              <Gem className="w-5 h-5" />
              מנוי
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
