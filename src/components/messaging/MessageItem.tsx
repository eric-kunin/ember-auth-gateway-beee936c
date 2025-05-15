
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

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
    <div className={cn(
      "flex items-start gap-2 mb-4",
      isSender ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8 mt-1">
        {senderAvatar && <AvatarImage src={senderAvatar} alt={senderName || "User"} />}
        <AvatarFallback className={cn(
          isSender ? "bg-theme-accent text-white" : "bg-gray-200 dark:bg-gray-600"
        )}>
          {fallbackText}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col max-w-[75%]">
        <div className={cn(
          "rounded-lg px-4 py-2 inline-block",
          isSender 
            ? "bg-theme-purple text-white rounded-br-none" 
            : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
        )}>
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </div>
        <span className={cn(
          "text-xs mt-1 text-gray-500",
          isSender ? "text-right" : "text-left"
        )}>
          {formatDistanceToNow(sentAt, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}
