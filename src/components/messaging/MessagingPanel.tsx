
import { useState } from "react";
import { ConversationList } from "./ConversationList";
import { ChatInterface } from "./ChatInterface";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

// Sample data for demo purposes
const SAMPLE_USER_ID = "current-user";

// Update the conversation type to include recipientAvatar
interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

// Sample conversation data with updated avatars
const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    recipientId: "user1",
    recipientName: "Yong Tonghyon",
    recipientAvatar: "/lovable-uploads/3e77111e-92e0-4c3f-90c6-ff7fc9c9a896.png",
    lastMessage: "What makes it different from...",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2
  },
  {
    id: "conv2",
    recipientId: "user2",
    recipientName: "Sarah Miller",
    recipientAvatar: "/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png",
    lastMessage: "The project deadline is approaching...",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0
  },
  {
    id: "conv3",
    recipientId: "user3",
    recipientName: "David Chen",
    recipientAvatar: "/lovable-uploads/101c11e0-73f1-4140-b100-53896f884b88.png",
    lastMessage: "Can we schedule a meeting for...",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 3
  },
  {
    id: "conv4",
    recipientId: "user4",
    recipientName: "Emma Thompson",
    recipientAvatar: undefined,
    lastMessage: "I reviewed the proposal and...",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 8),
    unreadCount: 0
  },
  {
    id: "conv5",
    recipientId: "user5",
    recipientName: "James Wilson",
    recipientAvatar: undefined,
    lastMessage: "The client loved our presentation!",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0
  },
  {
    id: "conv6",
    recipientId: "user6",
    recipientName: "Sophia Garcia",
    recipientAvatar: undefined,
    lastMessage: "Let's finalize the design tomorrow",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 1
  }
];

const SAMPLE_MESSAGES = {
  "conv1": [
    {
      id: "msg1",
      content: "Hey, how's it going?",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "msg2",
      content: "Pretty good! Working on the new project.",
      senderId: SAMPLE_USER_ID,
      recipientId: "user1",
      sentAt: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: "msg3",
      content: "Have you seen the latest updates?",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 20)
    },
    {
      id: "msg4",
      content: "Check this out https://short.ly/ghi82k",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: "msg5",
      isFile: true,
      fileDetails: {
        name: "CryptoCoin-Release.pdf",
        size: "12 mb"
      },
      content: "CryptoCoin-Release.pdf",
      senderId: "user1",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 10)
    },
    {
      id: "msg6",
      content: "Nope. Can you please upload it here?",
      senderId: SAMPLE_USER_ID,
      recipientId: "user1",
      sentAt: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: "msg7",
      content: "Wait, I'm looking into it!",
      senderId: SAMPLE_USER_ID,
      recipientId: "user1",
      sentAt: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      id: "msg8",
      content: "I checked it. Yep, that works!",
      senderId: SAMPLE_USER_ID,
      recipientId: "user1",
      sentAt: new Date(Date.now() - 1000 * 60 * 1)
    },
  ],
  "conv2": [
    {
      id: "msg9",
      content: "The project deadline is approaching fast. Are we on track?",
      senderId: "user2",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 120)
    },
    {
      id: "msg10",
      content: "Yes, we should be able to finish everything by Friday.",
      senderId: SAMPLE_USER_ID,
      recipientId: "user2",
      sentAt: new Date(Date.now() - 1000 * 60 * 115)
    }
  ],
  "conv3": [
    {
      id: "msg11",
      content: "Can we schedule a meeting for tomorrow to discuss the new feature?",
      senderId: "user3",
      recipientId: SAMPLE_USER_ID,
      sentAt: new Date(Date.now() - 1000 * 60 * 180)
    }
  ]
};

export function MessagingPanel() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("conv1");
  const [conversations, setConversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="h-[700px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg flex bg-white dark:bg-gray-950">
        {/* Conversation list - left sidebar */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-800">
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        {/* Chat interface - right side */}
        <div className="w-2/3">
          {selectedConversation ? (
            <ChatInterface
              currentUserId={SAMPLE_USER_ID}
              recipientId={selectedConversation.recipientId}
              recipientName={selectedConversation.recipientName}
              recipientAvatar={selectedConversation.recipientAvatar}
              recipientStatus="Last seen recently"
              messages={currentMessages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-white dark:bg-gray-950">
              <p className="text-gray-500 dark:text-gray-400 italic">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
