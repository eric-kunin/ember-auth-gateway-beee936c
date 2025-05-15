
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageItem } from "./MessageItem";
import { 
  PaperclipIcon, 
  SendIcon, 
  Phone, 
  Video, 
  MoreHorizontal,
  Smile, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

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
  const [showProfile, setShowProfile] = useState(false);
  const [muteChat, setMuteChat] = useState(false);
  const [disappearingMessages, setDisappearingMessages] = useState(false);

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
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setShowProfile(true)}
        >
          <Avatar className="h-10 w-10 border-2 border-purple-500/20 dark:border-purple-500/30">
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
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400 hover:bg-purple-100/50 dark:hover:bg-purple-900/20">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400 hover:bg-purple-100/50 dark:hover:bg-purple-900/20">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400 hover:bg-purple-100/50 dark:hover:bg-purple-900/20">
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
            className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400 hover:bg-purple-100/50 dark:hover:bg-purple-900/20"
          >
            <PaperclipIcon className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="min-h-[40px] max-h-[120px] resize-none rounded-full bg-gray-100 dark:bg-gray-900 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 dark:text-white"
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400 hover:bg-purple-100/50 dark:hover:bg-purple-900/20"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>
          
          <motion.div 
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isSending}
              className={cn(
                "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700",
                "rounded-full h-10 w-10 p-0 shadow-lg hover:shadow-purple-500/25",
                "transition-all duration-300 ease-in-out transform"
              )}
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md border-none bg-white dark:bg-gray-900 p-0 overflow-hidden">
          <div className="flex flex-col max-h-[80vh]">
            {/* Profile header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Profile</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowProfile(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Profile content */}
            <div className="overflow-y-auto">
              {/* Profile image */}
              <div className="bg-gradient-to-b from-purple-900 to-purple-800 p-4 flex justify-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800">
                    {recipientAvatar && (
                      <AvatarImage src={recipientAvatar} alt={recipientName} />
                    )}
                    <AvatarFallback className="text-4xl bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200">
                      {recipientName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{recipientName}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Last seen recently</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Bio</h4>
                    <p className="text-gray-800 dark:text-gray-200">Life is mirror, smile at it 😊</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Mobile</h4>
                    <p className="text-gray-800 dark:text-gray-200">6462662535</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Mute Chat</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Mute notifications for this chat</p>
                      </div>
                      <Switch
                        checked={muteChat}
                        onCheckedChange={setMuteChat}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Disappearing Messages</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Messages will disappear after they are read</p>
                      </div>
                      <Switch
                        checked={disappearingMessages}
                        onCheckedChange={setDisappearingMessages}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-gray-800">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3">Media, Links and Docs</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Example media thumbnails would go here */}
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
