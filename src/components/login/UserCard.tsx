
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, CheckCircle, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UserCardProps {
  nickname: string;
  age: number;
  location: string;
  imageUrl: string;
  rating: number;
  verified: boolean;
  photoCount: number;
  interests: string[];
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  nickname,
  age,
  location,
  imageUrl,
  rating,
  verified,
  photoCount,
  interests,
  className = "",
}) => {
  // Get first letter for avatar fallback
  const firstLetter = nickname.charAt(0);

  // Convert rating to stars (max 5)
  const ratingStars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-3 w-3 ${
        i < Math.round(rating) 
          ? "text-yellow-400 fill-yellow-400" 
          : "text-gray-300"
      }`}
    />
  ));

  return (
    <Card className={`overflow-hidden shadow-md bg-white/30 dark:bg-[#240046]/40 backdrop-blur-sm 
                    border-[#E0AAFF]/20 dark:border-[#9D4EDD]/20 hover:shadow-xl transition-all 
                    transform hover:scale-105 duration-300 group ${className}`}>
      <div className="relative w-full h-48 overflow-hidden">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage src={imageUrl} alt={nickname} className="object-cover" />
          <AvatarFallback className="text-3xl bg-[#9D4EDD]/30 dark:bg-[#240046]/90 text-white h-full w-full rounded-none">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
        
        {/* Verified badge */}
        {verified && (
          <div className="absolute top-2 left-2 bg-white/80 dark:bg-[#10002B]/70 p-1 rounded-full">
            <CheckCircle className="h-4 w-4 text-[#9D4EDD]" />
          </div>
        )}
        
        {/* Photo count badge */}
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-[#10002B]/70 px-2 py-1 rounded-full flex items-center gap-1">
          <Camera className="h-3 w-3 text-[#3B185F]" />
          <span className="text-xs text-[#3B185F] dark:text-white">x{photoCount}</span>
        </div>
        
        {/* Age badge */}
        <div className="absolute bottom-2 left-2 bg-[#9D4EDD]/80 px-2 py-1 rounded-full">
          <span className="text-xs text-white font-medium">{age}</span>
        </div>
      </div>
      
      <CardContent className="p-3 text-right" dir="rtl">
        <div className="font-medium text-[#240046] dark:text-white text-lg truncate mb-1">
          {nickname}
        </div>
        
        <div className="flex items-center justify-end gap-1 mb-2 text-[#3B185F] dark:text-[#E0AAFF]/70">
          <span className="text-sm truncate">{location}</span>
          <MapPin className="h-3 w-3 text-red-500 flex-shrink-0" />
        </div>
        
        <div className="flex justify-end mb-2">
          <div className="flex">{ratingStars}</div>
        </div>
        
        <div className="flex flex-wrap gap-1 justify-end">
          {interests.map((interest, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-[#E0AAFF]/30 dark:bg-[#3B185F]/50 text-[#3B185F] 
                      dark:text-[#E0AAFF] border-[#9D4EDD]/20 px-2 py-0"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
