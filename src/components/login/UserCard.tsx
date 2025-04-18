
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface UserCardProps {
  nickname: string;
  age: number;
  location: string;
  imageUrl: string;
  verified: boolean;
  className?: string;
}

const UserCard = ({
  nickname,
  age,
  location,
  imageUrl,
  verified,
  className = "",
}: UserCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <Card className="relative overflow-hidden bg-white/10 dark:bg-[#240046]/40 backdrop-blur-sm 
                    border-[#E0AAFF]/20 dark:border-[#9D4EDD]/20 p-3 hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <Avatar className="w-full h-24 rounded-lg">
            <AvatarImage src={imageUrl} alt={nickname} className="object-cover" />
            <AvatarFallback className="text-2xl bg-[#9D4EDD]/30">{nickname[0]}</AvatarFallback>
          </Avatar>
          
          {verified && (
            <div className="absolute top-2 right-2 bg-white/80 dark:bg-[#10002B]/70 p-1 rounded-full">
              <CheckCircle className="h-4 w-4 text-[#9D4EDD]" />
            </div>
          )}
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="font-medium text-white truncate">{nickname}, {age}</h3>
          <div className="flex items-center justify-center gap-1 text-[#E0AAFF] text-sm mt-1">
            <MapPin className="h-3 w-3 text-[#9D4EDD]" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default UserCard;
