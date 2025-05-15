
import { useState } from "react";
import { ConversationList } from "./ConversationList";
import { ChatInterface } from "./ChatInterface";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

// Sample data for demo purposes
const SAMPLE_USER_ID = "current-user";

const SAMPLE_CONVERSATIONS = [
  {
    id: "conv1",
    recipientId: "user1",
    recipientName: "Sarah Johnson",
    lastMessage: "When are we meeting up?",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2
  },
  {
    id: "conv2",
    recipientId: "user2",
    recipientName: "Michael Chen",
    lastMessage: "The project looks great!",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    unreadCount: 0
  },
  {
    id: "conv3",
    recipientId: "user3",
    recipientName: "Emily Davis",
    lastMessage: "Thanks for your help yesterday.",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unreadCount: 0
  }
];

const SAMPLE_MESSAGES = {
  "conv1": [
    {
      id: "msg1",
      content: "Hey, how's it going?",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: "msg2",
      content: "Pretty good! Working on the new project.",
      senderId: SAMPLE_USER_ID,
      recipientId: "user1",
      sentAt: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
    },
    {
      id: "msg3",
      content: "That sounds interesting! Can you tell me more about it?",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
    },
    {
      id: "msg4",
      content: "When are we meeting up?",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    }
  ],
  "conv2": [
    {
      id: "msg5",
      content: "I reviewed the designs.",
      senderId: "user2",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
    },
    {
      id: "msg6",
      content: "What did you think?",
      senderId: SAMPLE_USER_ID,
      recipientId: "user2",
      sentAt: new Date(Date.now() - 1000 * 60 * 115) // 1 hour 55 minutes ago
    },
    {
      id: "msg7",
      content: "The project looks great!",
      senderId: "user2",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    }
  ],
  "conv3": [
    {
      id: "msg8",
      content: "Thanks for your help yesterday.",
      senderId: "user3",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
    }
  ]
};

export function MessagingPanel() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("conv1");
  const [conversations, setConversations] = useState(SAMPLE_CONVERSATIONS);
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  
  const selectedConversation = selectedConversationId
    ? conversations.find(conv => conv.id === selectedConversationId)
    : null;
  
  const currentMessages = selectedConversationId 
    ? messages[selectedConversationId] || [] 
    : [];
  
  const handleSendMessage = (content: string) => {
    if (!selectedConversationId || !selectedConversation) return;
    
    const newMessage = {
      id: uuidv4(),
      content,
      senderId: SAMPLE_USER_ID,
      recipientId: selectedConversation.recipientId,
      sentAt: new Date()
    };
    
    // Update messages
    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage]
    }));
    
    // Update conversation preview
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversationId 
          ? {
              ...conv,
              lastMessage: content,
              lastMessageDate: new Date()
            }
          : conv
      )
    );
  };
  
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark as read when selecting
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };
  
  return (
    <Card className="flex h-[600px] border border-theme-light/10 overflow-hidden">
      <div className="w-1/3 border-r">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      
      <div className="w-2/3">
        {selectedConversation ? (
          <ChatInterface
            currentUserId={SAMPLE_USER_ID}
            recipientId={selectedConversation.recipientId}
            recipientName={selectedConversation.recipientName}
            recipientAvatar={selectedConversation.recipientAvatar}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </Card>
  );
}
