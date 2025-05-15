
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, History, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Chats</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100/50 dark:hover:bg-purple-900/20">
            <History className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100/50 dark:hover:bg-purple-900/20">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search conversations"
            className="pl-9 py-5 h-10 rounded-full bg-gray-100 dark:bg-gray-900 border-0 focus-visible:ring-1 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Conversations list */}
      <ScrollArea className="flex-1 px-1">
        {filteredConversations.length > 0 ? (
          <div className="space-y-0.5 py-2">
            {filteredConversations.map((conversation) => {
              const isSelected = selectedConversationId === conversation.id;
              const formattedTime = conversation.lastMessageDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
              
              return (
                <motion.button
                  key={conversation.id}
                  className={cn(
                    "flex items-center gap-3 w-full p-3 text-left rounded-lg transition-all",
                    isSelected 
                      ? "bg-purple-100 dark:bg-purple-900/20" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-900/50"
                  )}
                  onClick={() => onSelectConversation(conversation.id)}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="relative">
                    <Avatar className="border-2 border-transparent hover:border-purple-400">
                      {conversation.recipientAvatar && (
                        <AvatarImage src={conversation.recipientAvatar} alt={conversation.recipientName} />
                      )}
                      <AvatarFallback className={cn(
                        "text-white",
                        isSelected 
                          ? "bg-purple-600" 
                          : "bg-gray-400 dark:bg-gray-700"
                      )}>
                        {conversation.recipientName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className={cn(
                        "font-medium truncate",
                        conversation.unreadCount > 0 
                          ? "font-semibold text-gray-900 dark:text-gray-100" 
                          : "text-gray-800 dark:text-gray-200"
                      )}>
                        {conversation.recipientName}
                      </h4>
                      <span className={cn(
                        "text-xs whitespace-nowrap",
                        conversation.unreadCount > 0
                          ? "text-purple-600 dark:text-purple-400 font-medium"
                          : "text-gray-500 dark:text-gray-400"
                      )}>
                        {formattedTime}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm truncate mt-0.5",
                      conversation.unreadCount > 0 
                        ? "text-gray-900 dark:text-gray-100" 
                        : "text-gray-500 dark:text-gray-400"
                    )}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-4">
            <p className="text-gray-500 dark:text-gray-400 italic">No conversations found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
