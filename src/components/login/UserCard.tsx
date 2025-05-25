import React from 'react';
import { BadgeCheck, Camera, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

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
  simplified = false
}) => {
  return (
    <div className="w-full" dir="rtl">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="relative">
          {/* Profile Image */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt="Profile"
            className="w-full h-[255px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#392467]/90 to-transparent" />

          {/* Profile Info */}
          <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2"
            >
              {/* Rating & Photo Count */}
              {!simplified && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-white fill-white" />
                    <span className="text-sm">{rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4 text-white" />
                    <span className="text-sm">{photoCount}</span>
                  </div>
                </div>
              )}

              {/* Age, Nickname */}
<div className="text-lg font-bold flex items-center gap-1">
  <h2 className="truncate">{nickname},</h2>
  <span>{age}</span>
  
</div>

{/* Divider Line */}
<div className="w-2/3 ml-auto">
  <hr className="border-t border-black/60" />
</div>

{/* Location */}
<div className="flex items-center gap-1 text-white text-sm mt-1">
  <MapPin className="w-4 h-4 text-red-500" />
  <span>{location}</span>
</div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
