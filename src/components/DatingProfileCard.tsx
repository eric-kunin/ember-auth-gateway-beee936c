import React, { useState } from 'react';
import { Heart, Gift, SkipForward, Flag, Star, MessageCircle, MapPin, Music, Coffee, Book, BadgeCheck, X, AlertTriangle, Camera, Ghost, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatingProfileCardProps {
  nickname: string;
  age: number;
  rating: number;
  location: string;
  imageUrl: string;
  verified: boolean;
  photoCount: number;
  interests: string[];
}

// Custom Tooltip component
const CustomTooltip = ({ children, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 px-2 py-1 text-sm text-white bg-[#392467] rounded-md whitespace-nowrap right-1/2 translate-x-1/2 -top-8"
          >
            {title}
            <div className="absolute -bottom-1 right-1/2 translate-x-1/2 w-2 h-2 bg-[#392467] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DatingProfileCard: React.FC<DatingProfileCardProps> = ({
  nickname,
  age,
  rating,
  location,
  imageUrl,
  verified,
  photoCount,
  interests
}) => {
  // States
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isMessaging, setIsMessaging] = useState(false);
  
  // Constants
  const gifts = [
    { amount: 5 },
    { amount: 10 },
    { amount: 20 },
    { amount: 50 },
    { amount: 100 },
    { amount: 200 }
  ];

  const reportOptions = [
    { icon: <Ghost className="w-5 h-5" />, label: "פרופיל מזויף", description: "חשבון חשוד או מתחזה" },
    { icon: <Camera className="w-5 h-5" />, label: "תוכן לא ראוי", description: "עירום או תוכן מפורש" },
    { icon: <AlertTriangle className="w-5 h-5" />, label: "הטרדה", description: "בריונות או התנהגות פוגענית" },
    { icon: <Siren className="w-5 h-5" />, label: "הונאה", description: "בקשת כסף או קישורים חשודים" }
  ];

  const interestIcons = {
    music: <Music className="w-4 h-4" />,
    coffee: <Coffee className="w-4 h-4" />,
    books: <Book className="w-4 h-4" />,
    camera: <Camera className="w-4 h-4" />
  };

  // Handlers
  const handleGift = (amount) => {
    console.log(`Sending gift of ₪${amount}`);
    setShowGiftMenu(false);
  };

  const handleReport = (option) => {
    console.log(`Reported for: ${option.label}`);
    setShowReportMenu(false);
  };

  const handleSkip = () => {
    console.log("Profile skipped");
  };

  const handleMessage = () => {
    setIsMessaging(!isMessaging);
    console.log("Message toggled");
  };

  return (
    <div className="w-full">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="relative">
          {/* Profile Image */}
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl} 
            alt="Profile" 
            className="w-full h-[315px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#392467]/90 to-transparent" />
          
          {/* Action Buttons - Left side */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-3">
            <CustomTooltip title="לייק">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 backdrop-blur-md rounded-full transition-all duration-300 ${
                  isLiked 
                  ? 'bg-red-500/70' 
                  : 'bg-[#5D3587]/70 hover:bg-red-500/50'
                }`}
              >
                <motion.div
                  animate={isLiked ? { 
                    scale: [1, 1.5, 1],
                    rotate: [0, 15, -15, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className={`w-6 h-6 text-[#FFD1E3] ${isLiked ? 'fill-[#FFD1E3]' : ''}`} />
                </motion.div>
              </motion.button>
            </CustomTooltip>

            <CustomTooltip title="שלח הודעה">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMessage}
                className={`p-3 backdrop-blur-md rounded-full transition-all duration-300 ${
                  isMessaging 
                  ? 'bg-[#A367B1] scale-110' 
                  : 'bg-[#5D3587]/70 hover:bg-[#A367B1]'
                }`}
              >
                <motion.div
                  animate={isMessaging ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -15, 15, -15, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <MessageCircle className="w-6 h-6 text-[#FFD1E3]" />
                </motion.div>
              </motion.button>
            </CustomTooltip>

            <CustomTooltip title="שלח מתנה">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowGiftMenu(!showGiftMenu)}
                className="p-3 backdrop-blur-md bg-[#5D3587]/70 rounded-full hover:bg-[#A367B1] transition-all duration-300"
              >
                <Gift className="w-6 h-6 text-[#FFD1E3]" />
              </motion.button>
            </CustomTooltip>
          </div>

          {/* Skip/Report Buttons - Right side */}
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            {/* <CustomTooltip title="דלג">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 45 }}
                whileTap={{ scale: 0.9, rotate: 0 }}
                onClick={handleSkip}
                className="p-3 backdrop-blur-md bg-[#5D3587]/70 rounded-full hover:bg-[#A367B1] transition-all duration-300"
              >
                <SkipForward className="w-6 h-6 text-[#FFD1E3]" />
              </motion.button>
            </CustomTooltip> */}

            <CustomTooltip title="דווח">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowReportMenu(!showReportMenu)}
                className="p-3 backdrop-blur-md bg-[#5D3587]/70 rounded-full hover:bg-red-500/70 transition-all duration-300"
              >
                <Flag className="w-6 h-6 text-[#FFD1E3]" />
              </motion.button>
            </CustomTooltip>
          </div>

          {/* Profile Info */}
<div className="absolute bottom-0 right-0 left-0 p-4 text-white">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col gap-2"
  >
    {/* Star Rating and Image Counter */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-white fill-white" />
        <span className="text-sm text-white">{rating}</span>
      </div>
      <div className="flex items-center gap-1">
        <Camera className="w-4 h-4 text-white" />
        <span className="text-sm text-white">{photoCount}</span>
      </div>
    </div>

    {/* Name, Age and Verification */}
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-bold">{nickname}, {age}</h2>
      {verified && <BadgeCheck className="w-5 h-5 text-emerald-400" />}
    </div>

    {/* Location */}
    <div className="flex items-center gap-1 text-white/80">
      <MapPin className="w-4 h-4" />
      <span>{location}, ישראל</span>
    </div>

    {/* Interests */}
    <div className="flex gap-2 mt-1">
      {interests.map((interest, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.1 }}
          className="p-2 backdrop-blur-md bg-[#5D3587]/30 rounded-full text-white/90"
        >
          {interestIcons[interest]}
        </motion.div>
      ))}
    </div>
  </motion.div>
</div>


          {/* Gift Menu Overlay */}
          <AnimatePresence>
            {showGiftMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full right-0 w-full backdrop-blur-xl bg-[#392467]/90 rounded-2xl shadow-xl p-4 mb-2 z-20"
              >
                <div className="mb-3 text-center">
                  <h3 className="text-white text-lg font-semibold">שלח מתנה</h3>
                  <p className="text-white/70 text-sm">בחר סכום לשליחה</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {gifts.map((gift, index) => (
                    <motion.button
                      key={gift.amount}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: index * 0.1 }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'rgba(163, 103, 177, 0.8)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleGift(gift.amount)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl backdrop-blur-md bg-[#5D3587]/70 text-white transition-all duration-300 group"
                    >
                      <span className="text-2xl mb-1">💝</span>
                      <span className="text-[#FFD1E3] font-semibold">₪{gift.amount}</span>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGiftMenu(false)}
                  className="w-full mt-3 p-2 text-center text-white/70 hover:text-white text-sm transition-colors duration-300"
                >
                  ביטול
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Report Menu Overlay */}
          <AnimatePresence>
            {showReportMenu && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 backdrop-blur-md bg-[#392467]/90 z-30 flex flex-col items-center justify-center"
              >
                <div className="absolute top-0 right-0 left-0 p-4 text-center text-white border-b border-white/10">
                  <h3 className="text-xl font-semibold">דווח על פרופיל</h3>
                  <p className="text-sm text-white/70">בחר סיבה לדיווח</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowReportMenu(false)}
                  className="absolute top-4 right-4 p-2 text-white hover:text-[#FFD1E3] transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <div className="w-4/5 space-y-3 mt-16">
                  {reportOptions.map((option, index) => (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleReport(option)}
                      className="w-full p-4 backdrop-blur-md bg-white/10 rounded-xl text-white hover:bg-[#A367B1] transition-all duration-300 transform hover:scale-105 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                          {option.icon}
                        </div>
                        <div className="text-right flex-1">
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-sm text-white/70 group-hover:text-white/90">{option.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DatingProfileCard;