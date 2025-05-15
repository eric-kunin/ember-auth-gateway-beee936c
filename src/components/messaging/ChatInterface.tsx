
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageItem } from "./MessageItem";
import { 
  PaperclipIcon, 
  SendHorizontal, 
  Phone, 
  Video, 
  MoreHorizontal,
  Smile 
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: Date;
  isFile?: boolean;
  fileDetails?: {
    name: string;
    size: string;
  };
}

interface ChatInterfaceProps {
  currentUserId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  recipientStatus?: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatInterface({
  currentUserId,
  recipientId,
  recipientName,
  recipientAvatar,
  recipientStatus,
  messages,
  onSendMessage,
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setIsSending(true);
      // Simulate slight delay for animation effect
      setTimeout(() => {
        onSendMessage(newMessage.trim());
        setNewMessage("");
        setIsSending(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {recipientAvatar && <AvatarImage src={recipientAvatar} alt={recipientName} />}
            <AvatarFallback className="bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-200">
              {recipientName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-gray-800 dark:text-gray-200">{recipientName}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{recipientStatus || "Last seen recently"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/5 dark:bg-gray-950">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            content={message.content}
            sentAt={message.sentAt}
            isSender={message.senderId === currentUserId}
            senderName={message.senderId === currentUserId ? "You" : recipientName}
            senderAvatar={message.senderId !== currentUserId ? recipientAvatar : undefined}
            isFile={message.isFile}
            fileDetails={message.fileDetails}
          />
        ))}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 italic">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="border-t dark:border-gray-800 p-3 bg-white dark:bg-gray-950">
        <div className="flex gap-2 w-full items-end">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400"
          >
            <PaperclipIcon className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="min-h-[40px] max-h-[120px] resize-none rounded-full bg-gray-100 dark:bg-gray-900 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>
          
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isSending}
              className="bg-purple-600 hover:bg-purple-700 rounded-full h-9 w-9 p-0"
            >
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
