
import React from 'react';
import { BadgeCheck, Camera, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserCardProps {
  nickname: string;
  age: number;
  rating: number;
  location: string;
  imageUrl: string;
  verified: boolean;
  photoCount: number;
  interests: string[];
  simplified?: boolean;
  isOnline?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  nickname,
  age,
  rating,
  location,
  imageUrl,
  verified,
  photoCount,
  interests,
  simplified = false,
  isOnline = false
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full" dir="rtl">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="relative">
          {/* Online Status Ping - Top Right */}
          {isOnline && (
            <div className="absolute top-3 right-3 z-10">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-emerald-300 rounded-full animate-ping"></div>
              </div>
            </div>
          )}

          {/* Profile Image */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt="Profile"
            className={`w-full object-cover ${isMobile ? 'h-[180px]' : 'h-[255px]'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#392467]/90 to-transparent" />

          {/* Profile Info */}
          <div className={`absolute bottom-0 right-0 left-0 text-white ${isMobile ? 'p-2' : 'p-4'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-1"
            >
              {/* Rating & Photo Count */}
              {!simplified && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className={`text-white fill-white ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>{rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className={`text-white ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>{photoCount}</span>
                  </div>
                </div>
              )}

              {/* Age, Nickname */}
              <div className={`font-bold flex items-center gap-1 ${isMobile ? 'text-sm' : 'text-lg'}`}>
                <h2 className="truncate">{nickname},</h2>
                <span>{age}</span>
                {verified && <BadgeCheck className={`text-emerald-400 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />}
              </div>

              {/* Divider Line */}
              <div className="w-2/3 ml-auto">
                <hr className="border-t border-black/60" />
              </div>

              {/* Location */}
              <div className={`flex items-center gap-1 text-white mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <MapPin className={`text-red-500 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span className="truncate">{location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
