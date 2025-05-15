
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface MessageItemProps {
  content: string;
  sentAt: Date;
  isSender: boolean;
  senderName?: string;
  senderAvatar?: string;
  isFile?: boolean;
  fileDetails?: {
    name: string;
    size: string;
  };
}

export function MessageItem({ 
  content, 
  sentAt, 
  isSender, 
  senderName, 
  senderAvatar, 
  isFile,
  fileDetails 
}: MessageItemProps) {
  // Get first letter of name for avatar fallback
  const fallbackText = senderName ? senderName.charAt(0).toUpperCase() : "U";
  const formattedTime = sentAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  return (
    <motion.div 
      className={cn(
        "flex items-start gap-2 mb-3",
        isSender ? "flex-row-reverse" : "flex-row"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!isSender && (
        <Avatar className="h-8 w-8 mt-1 ring-1 ring-purple-500/30 dark:ring-purple-400/20">
          {senderAvatar && <AvatarImage src={senderAvatar} alt={senderName || "User"} />}
          <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex flex-col max-w-[80%]">
        {isFile ? (
          <motion.div 
            className={cn(
              "rounded-lg px-4 py-3 flex items-center gap-3",
              isSender 
                ? "bg-purple-600/90 text-white dark:bg-purple-800" 
                : "bg-gray-100 dark:bg-gray-800"
            )}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-purple-700/50 dark:bg-purple-500/20 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">{fileDetails?.name}</p>
              <p className="text-xs opacity-70">{fileDetails?.size}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className={cn(
              "rounded-lg px-3 py-2.5 inline-block shadow-md",
              isSender 
                ? "bg-purple-600 text-white rounded-tr-none dark:bg-purple-700" 
                : "bg-gray-100 dark:bg-gray-800 rounded-tl-none dark:text-white"
            )}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <p className="whitespace-pre-wrap break-words">{content}</p>
          </motion.div>
        )}
        
        <span className={cn(
          "text-xs mt-1 text-gray-500 dark:text-gray-400",
          isSender ? "text-right mr-1" : "text-left ml-1"
        )}>
          {formattedTime}
        </span>
      </div>
    </motion.div>
  );
}
