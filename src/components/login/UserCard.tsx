
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, MapPin } from "lucide-react";

interface UserCardProps {
  nickname: string;
  location: string;
  imageUrl: string;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  nickname,
  location,
  imageUrl,
  className = "",
}) => {
  // Get first letter for avatar fallback
  const firstLetter = nickname.charAt(0);

  return (
    <Card className={`w-40 overflow-hidden shadow-md bg-white/30 dark:bg-[#240046]/40 backdrop-blur-sm border-[#E0AAFF]/20 dark:border-[#9D4EDD]/20 ${className}`}>
      <div className="relative w-full h-36">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage src={imageUrl} alt={nickname} className="object-cover" />
          <AvatarFallback className="text-3xl bg-[#9D4EDD]/30 dark:bg-[#240046]/90 text-white h-full w-full rounded-none">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="p-2 text-right">
        <div className="font-medium text-[#240046] dark:text-white text-sm truncate" dir="rtl">
          {nickname}
        </div>
        <div className="text-xs flex items-center justify-end mt-1 text-[#3B185F] dark:text-[#E0AAFF]/70" dir="rtl">
          <span className="truncate">{location}</span>
          <MapPin className="h-3 w-3 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
