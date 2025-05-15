
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageItem } from "./MessageItem";
import { SendHorizontal, PaperclipIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: Date;
}

interface ChatInterfaceProps {
  currentUserId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatInterface({
  currentUserId,
  recipientId,
  recipientName,
  recipientAvatar,
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
    <Card className="flex flex-col h-full border-theme-light/10 bg-gradient-to-b from-purple-900/10 to-indigo-900/10 dark:from-purple-900/20 dark:to-indigo-900/20 backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-purple-200/20 dark:border-purple-800/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
        <CardTitle className="text-lg font-semibold text-purple-900 dark:text-purple-200">{recipientName}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            content={message.content}
            sentAt={message.sentAt}
            isSender={message.senderId === currentUserId}
            senderName={message.senderId === currentUserId ? "You" : recipientName}
            senderAvatar={message.senderId !== currentUserId ? recipientAvatar : undefined}
          />
        ))}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 italic">No messages yet. Start the conversation!</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-purple-200/20 dark:border-purple-800/20 p-3 bg-gradient-to-r from-purple-500/5 to-indigo-500/5">
        <div className="flex gap-2 w-full items-end">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full border-purple-300 dark:border-purple-700 bg-white/10 dark:bg-black/10 text-purple-700 dark:text-purple-300"
          >
            <PaperclipIcon className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[44px] resize-none rounded-2xl bg-white/80 dark:bg-gray-800/80 border-purple-200 dark:border-purple-900 focus:border-purple-400 focus:ring-purple-400"
          />
          
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isSending}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full h-10 w-10 p-0"
            >
              <SendHorizontal className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  );
}
