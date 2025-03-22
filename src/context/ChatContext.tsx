
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Message = {
  userMessage: string;
  agentResponse: string;
};

type ChatContextType = {
  assetId: string | null;
  chatThreadId: string | null;
  messages: Message[];
  isProcessing: boolean;
  processingError: string | null;
  isChatting: boolean;
  chattingError: string | null;
  setAssetId: (id: string | null) => void;
  setChatThreadId: (id: string | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setProcessingError: (error: string | null) => void;
  setIsChatting: (isChatting: boolean) => void;
  setChattingError: (error: string | null) => void;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assetId, setAssetId] = useState<string | null>(null);
  const [chatThreadId, setChatThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [chattingError, setChattingError] = useState<string | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const resetChat = () => {
    setAssetId(null);
    setChatThreadId(null);
    setMessages([]);
    setProcessingError(null);
    setChattingError(null);
  };

  return (
    <ChatContext.Provider
      value={{
        assetId,
        chatThreadId,
        messages,
        isProcessing,
        processingError,
        isChatting,
        chattingError,
        setAssetId,
        setChatThreadId,
        setMessages,
        addMessage,
        setIsProcessing,
        setProcessingError,
        setIsChatting,
        setChattingError,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
