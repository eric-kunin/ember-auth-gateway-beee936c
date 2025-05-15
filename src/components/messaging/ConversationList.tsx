
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation 
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full border-r border-theme-light/10 bg-gradient-to-b from-purple-900/5 to-indigo-900/5 dark:from-purple-900/10 dark:to-indigo-900/10">
      <div className="p-3 border-b border-purple-200/20 dark:border-purple-800/20">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 rounded-full bg-white/80 dark:bg-gray-800/80 border-purple-200 dark:border-purple-900 focus:border-purple-400 focus:ring-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredConversations.length > 0 ? (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => (
              <motion.button
                key={conversation.id}
                className={cn(
                  "flex items-center gap-3 w-full p-3 text-left rounded-lg transition-all",
                  selectedConversationId === conversation.id 
                    ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 dark:from-purple-800/40 dark:to-indigo-800/40" 
                    : "hover:bg-purple-100/50 dark:hover:bg-purple-900/20"
                )}
                onClick={() => onSelectConversation(conversation.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <Avatar className={cn(
                    "ring-2", 
                    conversation.unreadCount > 0 
                      ? "ring-purple-500" 
                      : "ring-gray-200 dark:ring-gray-700"
                  )}>
                    {conversation.recipientAvatar && (
                      <AvatarImage src={conversation.recipientAvatar} alt={conversation.recipientName} />
                    )}
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                      {conversation.recipientName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.unreadCount > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {conversation.unreadCount}
                    </motion.span>
                  )}
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h4 className={cn(
                      "font-medium truncate",
                      conversation.unreadCount > 0 && "font-semibold text-purple-900 dark:text-purple-300"
                    )}>
                      {conversation.recipientName}
                    </h4>
                    <span className="text-xs text-purple-500/80 dark:text-purple-400/80">
                      {formatDistanceToNow(conversation.lastMessageDate, { addSuffix: false })}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm truncate",
                    conversation.unreadCount > 0 
                      ? "text-purple-800 dark:text-purple-200" 
                      : "text-gray-500 dark:text-gray-400"
                  )}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-4 text-gray-500 dark:text-gray-400 italic">
            No conversations found
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
