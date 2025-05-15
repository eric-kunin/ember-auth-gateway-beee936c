
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
}

export function MessageItem({ content, sentAt, isSender, senderName, senderAvatar }: MessageItemProps) {
  // Get first letter of name for avatar fallback
  const fallbackText = senderName ? senderName.charAt(0).toUpperCase() : "U";
  
  return (
    <motion.div 
      className={cn(
        "flex items-start gap-2 mb-4",
        isSender ? "flex-row-reverse" : "flex-row"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-8 w-8 mt-1 ring-2 ring-purple-300 dark:ring-purple-600">
        {senderAvatar && <AvatarImage src={senderAvatar} alt={senderName || "User"} />}
        <AvatarFallback className={cn(
          isSender 
            ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white" 
            : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"
        )}>
          {fallbackText}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col max-w-[75%]">
        <motion.div 
          className={cn(
            "rounded-2xl px-4 py-2 inline-block shadow-sm",
            isSender 
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none" 
              : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-bl-none"
          )}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </motion.div>
        <span className={cn(
          "text-xs mt-1 text-gray-500",
          isSender ? "text-right" : "text-left"
        )}>
          {formatDistanceToNow(sentAt, { addSuffix: true })}
        </span>
      </div>
    </motion.div>
  );
}
