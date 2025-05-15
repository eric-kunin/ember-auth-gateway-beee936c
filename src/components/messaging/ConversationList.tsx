
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

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
    <div className="flex flex-col h-full border-r border-theme-light/10">
      <div className="p-3 border-b border-theme-light/10">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "flex items-center gap-3 w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                selectedConversationId === conversation.id && "bg-gray-100 dark:bg-gray-800"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="relative">
                <Avatar>
                  {conversation.recipientAvatar && (
                    <AvatarImage src={conversation.recipientAvatar} alt={conversation.recipientName} />
                  )}
                  <AvatarFallback>
                    {conversation.recipientName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {conversation.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-theme-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium truncate">{conversation.recipientName}</h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(conversation.lastMessageDate, { addSuffix: false })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center h-full p-4 text-gray-500">
            No conversations found
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
