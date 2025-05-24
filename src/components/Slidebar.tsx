import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  Eye,
  Bell,
  Newspaper,
  Coffee,
  Hash,
  ChevronRight,
  LifeBuoy,
  User,
  ChevronDown,
} from "lucide-react";

const ModernSidebar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Animation variants
  const sidebarVariants = {
    open: {
      width: "260px",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
    closed: {
      width: "80px",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
  };

  const menuItemVariants = {
    hover: {
      x: 4,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const profileMenuVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  };

  const menuItems = [
    { icon: <Eye />, label: "צפייה בפרופילים", path: "/watch" },
    { icon: <MessageSquare />, label: "צ׳אטים", path: "/chats" },
    { icon: <Bell />, label: "התראות", path: "/notifications" },
    { icon: <Newspaper />, label: "בלוג וחדשות", path: "/blog" },
    { icon: <Coffee />, label: "טיפים", path: "/tips" },
    { icon: <Hash />, label: "טרנדים", path: "/trends" },
  ];

  // Handle hover effects
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!showProfileMenu) {
      setIsOpen(false);
    }
  };

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (menuRef.current) {
        setIsScrolled(menuRef.current.scrollTop > 0);
      }
    };

    menuRef.current?.addEventListener("scroll", handleScroll);
    return () => menuRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MenuItem = ({ icon, label, path, className = "" }) => (
    <motion.button
      key={path}
      className={`flex items-center gap-3 p-3 hover:bg-[#5D3587]/50 rounded-lg transition-all duration-300 group relative ${
        activeItem === path ? "bg-[#5D3587]" : ""
      } ${className}`}
      variants={menuItemVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => setActiveItem(path)}
    >
      <div className="text-[#A367B1] group-hover:text-[#FFD1E3] transition-colors">
        {icon}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-sm whitespace-nowrap text-[#FFD1E3]/90"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {activeItem === path && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute right-0 w-1 h-full bg-[#FFD1E3] rounded-l-full"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </motion.button>
  );

  const ProfileMenuItem = ({ label, onClick, danger = false }) => (
    <motion.button
      className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors ${
        danger
          ? "text-red-400 hover:bg-red-400/10"
          : "text-[#FFD1E3]/90 hover:bg-[#392467]/30"
      }`}
      variants={menuItemVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );

  return (
    <motion.div
      className="fixed left-0 top-0 h-screen bg-[#392467] text-white flex flex-col shadow-2xl"
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="closed"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Menu */}
      <div
        ref={menuRef}
        className={`flex-1 flex flex-col gap-2 px-3 mt-8 overflow-y-auto scrollbar-hide relative ${
          isScrolled ? "after:absolute after:top-0 after:left-0 after:right-0 after:h-4 after:bg-gradient-to-b after:from-[#392467] after:to-transparent" : ""
        }`}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.path} {...item} />
        ))}
      </div>

      {/* Profile Section */}
      <div ref={profileRef} className="flex-none p-4">
        <motion.button
          className={`flex items-center gap-3 p-3 rounded-lg w-full group transition-colors ${
            showProfileMenu ? "bg-[#5D3587]" : "hover:bg-[#5D3587]/50"
          }`}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img
            src="https://i.pinimg.com/736x/bc/13/e5/bc13e566c79f4a0c44bcef1a3ddd7a5e.jpg"
            alt="Profile"
            width={10}
            height={10}
            className="w-10 h-10 rounded-full object-cover"
          />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-start"
              >
                <span className="text-sm font-medium text-[#FFD1E3]">John Doe</span>
                <span className="text-xs text-[#FFD1E3]/60">john@example.com</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {showProfileMenu && (
            <motion.div
              className="absolute bottom-24 left-4 right-4 bg-[#5D3587] rounded-lg shadow-xl p-2 space-y-1"
              variants={profileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ProfileMenuItem
                label="הגדרות"
                onClick={() => console.log("Settings clicked")}
              />
              <ProfileMenuItem
                label="תמיכה"
                onClick={() => alert("Support page coming soon!")}
              />
              <ProfileMenuItem
                label={isDark ? "מצב לילה" : "מצב יום"}
                onClick={() => setIsDark(!isDark)}
              />
              <motion.div className="w-full h-px bg-[#392467]" />
              <ProfileMenuItem
                label="התנתק"
                onClick={() => console.log("Logout clicked")}
                danger
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ModernSidebar;