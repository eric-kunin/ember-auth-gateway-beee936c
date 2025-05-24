// src/components/chat/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Send, 
  Image as ImageIcon, 
  Paperclip, 
  Smile, 
  Heart, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  ArrowLeft, 
  ChevronDown,
  Gift,
  Clock,
  MessageCircle,
  User,
  UserCheck,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface User {
  id: number;
  nickname: string;
  age: number;
  avatar: string;
  verified: boolean;
  lastSeen?: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  isEdited: boolean;
  attachments?: Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name?: string;
  }>;
}

interface ChatInterfaceProps {
  currentUser: User;
  selectedUser: User;
  onBack?: () => void;
}

// Custom UI Components to replace shadcn/ui
const Avatar = ({ 
  src, 
  alt, 
  children, 
  className = '' 
}: { 
  src?: string; 
  alt?: string; 
  children?: React.ReactNode; 
  className?: string 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 ${className}`}>
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#5D3587] text-white">
          {children || <User size={16} />}
        </div>
      )}
    </div>
  );
};

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'default', 
  size = 'default',
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
  variant?: 'default' | 'ghost' | 'outline'; 
  size?: 'default' | 'icon' | 'sm';
  disabled?: boolean;
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D3587] disabled:pointer-events-none disabled:opacity-50';
  
  const variantStyles = {
    default: 'bg-[#5D3587] text-white hover:bg-[#4e2d70]',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-100 hover:text-gray-900'
  };
  
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    icon: 'h-9 w-9'
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  value, 
  onChange, 
  onKeyDown,
  placeholder, 
  className = '',
  autoFocus = false
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string; 
  className?: string;
  autoFocus?: boolean;
}) => {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder} 
      autoFocus={autoFocus}
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D3587] focus-visible:ring-offset-2 disabled:opacity-50 ${className}`} 
    />
  );
};

const Badge = ({ 
  children, 
  className = '',
  variant = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'outline';
}) => {
  const variantStyles = {
    default: 'bg-[#A367B1] text-white',
    outline: 'bg-transparent border border-gray-200 text-gray-500'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`relative overflow-auto ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

const Tooltip = ({ 
  children, 
  content 
}: { 
  children: React.ReactNode; 
  content: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 px-2 py-1 text-sm text-white bg-[#392467] rounded-md whitespace-nowrap left-1/2 -translate-x-1/2 bottom-full mb-2"
          >
            {content}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#392467] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Dropdown = ({ 
  trigger, 
  children,
  align = 'center'
}: { 
  trigger: React.ReactNode; 
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  };
  
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={`absolute mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md ${alignStyles[align]}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({ 
  children, 
  onClick,
  className = ''
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button 
      onClick={onClick} 
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
};

const AlertDialogComponent = ({ 
  isOpen, 
  onClose,
  title,
  description,
  cancelText = 'ביטול',
  confirmText = 'אישור',
  onConfirm,
  confirmClass = ''
}: { 
  isOpen: boolean; 
  onClose: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  confirmClass?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-gray-500">{description}</p>
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>
                  {cancelText}
                </Button>
                <Button className={confirmClass} onClick={() => { onConfirm(); onClose(); }}>
                  {confirmText}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Helper function to format date without date-fns dependency
const formatDate = (date: Date): string => {
  return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
};

const formatFullDate = (date: Date): string => {
  return date.toLocaleDateString('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Sample data - Conversations
const generateFakeMessages = (currentUserId: number, selectedUserId: number): Message[] => {
  const now = new Date();
  
  return [
    {
      id: '1',
      senderId: selectedUserId,
      receiverId: currentUserId,
      text: 'היי, מה שלומך?',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      status: 'read',
      isEdited: false
    },
    {
      id: '2',
      senderId: currentUserId,
      receiverId: selectedUserId,
      text: 'היי! הכל טוב, מה איתך?',
      timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false
    },
    {
      id: '3',
      senderId: selectedUserId,
      receiverId: currentUserId,
      text: 'גם טוב, תודה! ראיתי שאתה מתל אביב?',
      timestamp: new Date(now.getTime() - 22 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false
    },
    {
      id: '4',
      senderId: currentUserId,
      receiverId: selectedUserId,
      text: 'כן, אני גר בצפון העיר. אני מניח שגם את מהאזור לפי הפרופיל שלך?',
      timestamp: new Date(now.getTime() - 20 * 60 * 60 * 1000),
      status: 'read',
      isEdited: true
    },
    {
      id: '5',
      senderId: selectedUserId,
      receiverId: currentUserId,
      text: 'כן, אני ברמת אביב. מגניב למצוא מישהו קרוב! 😊',
      timestamp: new Date(now.getTime() - 19 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false,
      attachments: [
        {
          id: 'a1',
          type: 'image',
          url: 'https://i.pinimg.com/736x/08/18/84/081884394818f74a312defa0d1fef2e5.jpg',
        }
      ]
    },
    {
      id: '6',
      senderId: currentUserId,
      receiverId: selectedUserId,
      text: 'נכון! איזה מקומות בתל אביב את אוהבת?',
      timestamp: new Date(now.getTime() - 18 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false
    },
    {
      id: '7',
      senderId: selectedUserId,
      receiverId: currentUserId,
      text: 'אני אוהבת את שדרות רוטשילד, את הטיילת, ויש כמה מסעדות מעולות ביפו שאני הולכת אליהן לעתים קרובות.',
      timestamp: new Date(now.getTime() - 17 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false
    },
    {
      id: '8',
      senderId: currentUserId,
      receiverId: selectedUserId,
      text: 'וואו, גם אני אוהב את יפו! יש לך המלצה טובה למסעדה שם?',
      timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false
    },
    {
      id: '9',
      senderId: selectedUserId,
      receiverId: currentUserId,
      text: 'בטח! אני ממליצה על "אבו חסן" לחומוס מעולה, ו"אולד מן אנד דה סי" לארוחת ערב יותר מיוחדת עם נוף מדהים.',
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      status: 'read',
      isEdited: false
    },
    {
      id: '10',
      senderId: currentUserId,
      receiverId: selectedUserId,
      text: 'נשמע מצוין! אולי נוכל ללכת לשם פעם ביחד? 😊',
      timestamp: new Date(now.getTime() - 30 * 60 * 1000),
      status: 'delivered',
      isEdited: false
    },
    {
      id: '11',
      senderId: selectedUserId,
      receiverId: currentUserId,
      text: 'זה נשמע כמו רעיון נחמד! 🌹',
      timestamp: new Date(now.getTime() - 15 * 60 * 1000),
      status: 'sent',
      isEdited: false
    }
  ];
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  currentUser, 
  selectedUser, 
  onBack 
}) => {
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [showDeleteAlert, setShowDeleteAlert] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize messages
  useEffect(() => {
    setMessages(generateFakeMessages(currentUser.id, selectedUser.id));
  }, [currentUser.id, selectedUser.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
    
    // Simulate typing for the last message
    if (messages.length > 0 && messages[messages.length - 1].senderId === currentUser.id) {
      setTypingIndicator(true);
      
      const timer = setTimeout(() => {
        setTypingIndicator(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Monitor scroll position
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const scrollPosition = scrollArea.scrollTop;
      const scrollHeight = scrollArea.scrollHeight;
      const clientHeight = scrollArea.clientHeight;
      
      // Show scroll down button if not at bottom
      setShowScrollDown(scrollPosition < scrollHeight - clientHeight - 100);
    };

    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: messageText,
      timestamp: new Date(),
      status: 'sent',
      isEdited: false
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    // Simulate reply
    setTimeout(() => {
      setTypingIndicator(true);
      
      setTimeout(() => {
        setTypingIndicator(false);
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedUser.id,
          receiverId: currentUser.id,
          text: getRandomResponse(),
          timestamp: new Date(),
          status: 'sent',
          isEdited: false
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 3000);
    }, 3000);
  };

  const getRandomResponse = () => {
    const responses = [
      "וואו, באמת? זה מעניין!",
      "אני שמחה שכתבת, בדיוק חשבתי עליך 😊",
      "זה נשמע נהדר!",
      "אני אשמח להיפגש בקרוב",
      "תודה על ההודעה, יום נעים!",
      "מה התוכניות שלך להערב?",
      "אתה תמיד יודע מה להגיד... 💕",
      "אני אוהבת את הדרך שאתה חושב"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startEditMessage = (message: Message) => {
    if (message.senderId !== currentUser.id) return;
    setEditingMessageId(message.id);
    setEditText(message.text);
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  const saveEdit = (messageId: string) => {
    if (!editText.trim()) return;
    
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: editText, isEdited: true } 
          : msg
      )
    );
    
    setEditingMessageId(null);
    setEditText('');
  };

  const confirmDelete = (messageId: string) => {
    setShowDeleteAlert(messageId);
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    setShowDeleteAlert(null);
  };

  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'היום, ' + formatDate(date);
    } else if (diffDays === 1) {
      return 'אתמול, ' + formatDate(date);
    } else if (diffDays < 7) {
      return date.toLocaleDateString('he-IL', { weekday: 'long' }) + ', ' + formatDate(date);
    } else {
      return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ', ' + formatDate(date);
    }
  };

  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';
    let currentGroup: Message[] = [];

    messages.forEach(message => {
      const messageDate = formatShortDate(message.timestamp);
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }

    return groups;
  };

  // Get status icon based on message status
  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <Check className="h-3 w-3 text-blue-400" />;
      case 'read':
        return (
          <div className="flex -space-x-1">
            <Check className="h-3 w-3 text-blue-400" />
            <Check className="h-3 w-3 text-blue-400 relative right-1" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderMessageGroup = (group: { date: string; messages: Message[] }, index: number) => {
    const dateObj = new Date(group.date.split('/').reverse().join('-'));
    const formattedDate = formatFullDate(dateObj);
    
    return (
      <div key={`group-${index}`} className="mb-4">
        <div className="flex justify-center mb-2">
          <Badge variant="outline" className="text-xs text-gray-500 bg-gray-100/50 backdrop-blur-sm">
            {formattedDate}
          </Badge>
        </div>
        
        {group.messages.map(message => {
          const isCurrentUser = message.senderId === currentUser.id;
          
          return (
            <div 
              key={message.id} 
              className={`mb-3 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
                {!isCurrentUser && (
                  <Avatar 
                    src={selectedUser.avatar} 
                    alt={selectedUser.nickname}
                    className="h-8 w-8 mr-2 mt-1"
                  >
                    {selectedUser.nickname[0]}
                  </Avatar>
                )}
                
                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  {/* Message bubble */}
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-sm group ${
                      isCurrentUser
                        ? 'bg-[#5D3587] text-white ml-2'
                        : 'bg-[#f0f0f0] text-gray-800 mr-2'
                    }`}
                  >
                    {editingMessageId === message.id ? (
                      <div className="flex flex-col gap-2">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          className={`border-none ${isCurrentUser ? 'bg-[#4e2d70] text-white' : 'bg-[#e5e5e5] text-gray-800'}`}
                        />
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={cancelEdit}
                            className="h-6 w-6 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => saveEdit(message.id)}
                            className="h-6 w-6 text-white hover:text-gray-200"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        {message.text}
                        
                        {isCurrentUser && (
                          <Dropdown
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -top-1 -right-2 h-6 w-6 text-gray-400 hover:text-white hover:bg-[#392467]/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            }
                            align="end"
                          >
                            <DropdownItem onClick={() => startEditMessage(message)}>
                              <Edit className="h-4 w-4 mr-2" />
                              <span>ערוך</span>
                            </DropdownItem>
                            <DropdownItem 
                              onClick={() => confirmDelete(message.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                              <span>מחק</span>
                            </DropdownItem>
                          </Dropdown>
                        )}
                      </div>
                    )}
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.map(attachment => (
                      <div key={attachment.id} className="mt-2">
                        {attachment.type === 'image' && (
                          <img 
                            src={attachment.url} 
                            alt="Attached" 
                            className="rounded-lg max-h-48 object-cover cursor-pointer"
                            onClick={() => setImagePreview(attachment.url)}
                          />
                        )}
                        {attachment.type === 'file' && (
                          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                            <Paperclip className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{attachment.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Message meta */}
                  <div 
                    className={`flex items-center mt-1 text-xs text-gray-500 ${
                      isCurrentUser ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <span className="mx-1">{formatDate(message.timestamp)}</span>
                    {isCurrentUser && getStatusIcon(message.status)}
                    {message.isEdited && <span className="text-xs text-gray-400 mx-1">(נערך)</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-xl" dir="rtl">
      {/* Chat Header */}
      <div className="bg-[#392467] text-white p-3 flex items-center justify-between">
        <div className="flex items-center">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar 
            src={selectedUser.avatar} 
            alt={selectedUser.nickname}
            className="h-10 w-10 border-2 border-[#A367B1]"
          >
            {selectedUser.nickname[0]}
          </Avatar>
          <div className="mr-3">
            <div className="flex items-center">
              <h3 className="font-semibold">{selectedUser.nickname}</h3>
              <span className="mx-1 text-sm">{selectedUser.age}</span>
              {selectedUser.verified && (
                <Badge className="h-4 bg-emerald-500 mr-1 px-1">
                  <Check className="h-3 w-3" />
                </Badge>
              )}
            </div>
            <div className="text-xs flex items-center">
              {selectedUser.isOnline ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  <span>מחובר/ת</span>
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>נראה לאחרונה {selectedUser.lastSeen || 'היום'}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Tooltip content="שלח מתנה">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#5D3587]">
              <Gift className="h-5 w-5" />
            </Button>
          </Tooltip>
          
          <Dropdown
            trigger={
              <Button variant="ghost" size="icon" className="text-white hover:bg-[#5D3587]">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            }
            align="end"
          >
            <DropdownItem>הצג פרופיל</DropdownItem>
            <DropdownItem>חסום משתמש</DropdownItem>
            <DropdownItem className="text-red-500">דווח על משתמש</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea 
        className="flex-grow p-4 relative bg-gradient-to-b from-[#f8f5ff] to-white"
        ref={scrollAreaRef}
      >
        {groupMessagesByDate().map((group, index) => renderMessageGroup(group, index))}
        
        {/* Typing indicator */}
        {typingIndicator && (
          <div className="flex items-end mb-4">
            <Avatar 
              src={selectedUser.avatar}
              alt={selectedUser.nickname}
              className="h-8 w-8 mr-2"
            >
              {selectedUser.nickname[0]}
            </Avatar>
            <div className="bg-[#f0f0f0] rounded-2xl px-4 py-2 text-gray-800">
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
        
        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollDown && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-5 right-1/2 transform translate-x-1/2 bg-[#5D3587] text-white rounded-full p-2 shadow-lg"
              onClick={scrollToBottom}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Tooltip content="צרף קובץ">
            <Button variant="ghost" size="icon" className="text-[#5D3587]">
              <Paperclip className="h-5 w-5" />
            </Button>
          </Tooltip>
          
          <Tooltip content="שלח תמונה">
            <Button variant="ghost" size="icon" className="text-[#5D3587]">
              <ImageIcon className="h-5 w-5" />
            </Button>
          </Tooltip>
          
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="הקלד הודעה..."
            className="flex-grow border-[#A367B1]/30 focus-visible:ring-[#5D3587]"
          />
          
          <Tooltip content="הוסף אימוג'י">
            <Button variant="ghost" size="icon" className="text-[#5D3587]">
              <Smile className="h-5 w-5" />
            </Button>
          </Tooltip>
          
          <Button 
            onClick={sendMessage} 
            size="icon" 
            className="bg-[#5D3587] hover:bg-[#4e2d70] text-white"
            disabled={!messageText.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setImagePreview(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={imagePreview}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setImagePreview(null);
              }}
            >
              <X className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AlertDialogComponent
        isOpen={!!showDeleteAlert}
        onClose={() => setShowDeleteAlert(null)}
        title="למחוק הודעה?"
        description="האם אתה בטוח שברצונך למחוק הודעה זו? פעולה זו אינה ניתנת לביטול."
        cancelText="ביטול"
        confirmText="מחק"
        confirmClass="bg-red-500 hover:bg-red-600"
        onConfirm={() => showDeleteAlert && deleteMessage(showDeleteAlert)}
      />
    </div>
  );
};

// Chat List Component
interface ChatListProps {
  currentUser: User;
  chats: Array<{
    user: User;
    lastMessage: Message;
    unreadCount: number;
  }>;
  onSelectChat: (user: User) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ currentUser, chats, onSelectChat }) => {
  return (
    <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-xl" dir="rtl">
      <div className="bg-[#392467] text-white p-4">
        <h2 className="text-xl font-bold">הודעות</h2>
      </div>
      
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Input
            placeholder="חפש בשיחות..."
            className="pr-8 border-[#A367B1]/30 focus-visible:ring-[#5D3587]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <div
              key={chat.user.id}
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectChat(chat.user)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <Avatar 
                    src={chat.user.avatar}
                    alt={chat.user.nickname}
                    className="h-12 w-12 border-2 border-[#A367B1]"
                  >
                    {chat.user.nickname[0]}
                  </Avatar>
                  {chat.user.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                </div>
                
                <div className="flex-grow mr-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <h3 className="font-medium">{chat.user.nickname}</h3>
                      <span className="mr-1 text-sm text-gray-500">{chat.user.age}</span>
                      {chat.user.verified && (
                        <Badge className="h-4 bg-emerald-500 mr-1 px-1">
                          <Check className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate max-w-[180px]">
                      {chat.lastMessage.senderId === currentUser.id && (
                        <span className="text-[#5D3587] ml-1">את/ה:</span>
                      )}
                      {chat.lastMessage.text}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                      <Badge className="bg-[#A367B1]">{chat.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// Main Chat Component that combines both list and chat interface
interface ChatContainerProps {
  currentUser: User;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Sample users and chats
  const users: User[] = [
    {
      id: 1,
      nickname: "שרה",
      age: 21,
      avatar: "https://i.pinimg.com/736x/08/18/84/081884394818f74a312defa0d1fef2e5.jpg",
      verified: true,
      isOnline: true
    },
    {
      id: 2,
      nickname: "רחל",
      age: 23,
      avatar: "https://i.pinimg.com/736x/f1/9a/60/f19a6017de7e62beed9def5967abc786.jpg",
      verified: true,
      lastSeen: "לפני שעה"
    },
    {
      id: 3,
      nickname: "מיכל",
      age: 19,
      avatar: "https://i.pinimg.com/736x/82/74/02/827402ab8907a51f774ce4ba55e400fa.jpg",
      verified: false,
      isOnline: true
    },
    {
      id: 4,
      nickname: "נועה",
      age: 27,
      avatar: "https://i.pinimg.com/736x/82/c2/2c/82c22c667af8527b16d861a4644b2454.jpg",
      verified: true,
      lastSeen: "אתמול"
    },
    {
      id: 5,
      nickname: "יעל",
      age: 31,
      avatar: "https://i.pinimg.com/736x/0e/31/44/0e31446c0690aabb57654733a88963e1.jpg",
      verified: false,
      lastSeen: "לפני שעתיים"
    }
  ];

  const sampleChats = users.map(user => ({
    user,
    lastMessage: {
      id: `last-${user.id}`,
      senderId: Math.random() > 0.5 ? currentUser.id : user.id,
      receiverId: Math.random() > 0.5 ? user.id : currentUser.id,
      text: `הודעה אחרונה מ${user.nickname}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
      status: 'read' as const,
      isEdited: false
    },
    unreadCount: Math.floor(Math.random() * 3)
  }));

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // When user clicks back button on mobile
  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto h-[80vh] p-4">
      <div className="flex h-full gap-4">
        {/* On mobile: Show either list or chat based on selection */}
        {isMobile ? (
          selectedUser ? (
            <div className="w-full">
              <ChatInterface
                currentUser={currentUser}
                selectedUser={selectedUser}
                onBack={handleBack}
              />
            </div>
          ) : (
            <div className="w-full">
              <ChatList
                currentUser={currentUser}
                chats={sampleChats}
                onSelectChat={setSelectedUser}
              />
            </div>
          )
        ) : (
          // On desktop: Show both list and chat
          <>
            <div className="w-1/3">
              <ChatList
                currentUser={currentUser}
                chats={sampleChats}
                onSelectChat={setSelectedUser}
              />
            </div>
            <div className="w-2/3">
              {selectedUser ? (
                <ChatInterface
                  currentUser={currentUser}
                  selectedUser={selectedUser}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center p-6">
                    <Heart className="h-16 w-16 text-[#5D3587] mx-auto mb-4" />
                    <h2 className="text-xl font-medium text-gray-700 mb-2">ברוכים הבאים לצ'אט</h2>
                    <p className="text-gray-500">בחר שיחה מהרשימה כדי להתחיל לשוחח</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Usage Example for a page
export default function ChatPage() {
  // Current logged in user
  const currentUser: User = {
    id: 999,
    nickname: "דני",
    age: 28,
    avatar: "/api/placeholder/100/100",
    verified: true
  };
  
  return (
    <div className="bg-gradient-to-br from-[#FFD1E3] to-[#A367B1]/20 min-h-screen">
      <ChatContainer currentUser={currentUser} />
    </div>
  );
}