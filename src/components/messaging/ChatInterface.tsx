
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageItem } from "./MessageItem";
import { SendHorizontal } from "lucide-react";

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full border-theme-light/10">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg">{recipientName}</CardTitle>
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
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex gap-2 w-full">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[44px] resize-none"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
            className="bg-theme-purple hover:bg-theme-purple/90"
          >
            <SendHorizontal className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
