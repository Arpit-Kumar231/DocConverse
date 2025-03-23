
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { useChatContext } from '@/context/ChatContext';
import { sendChatMessage } from '@/services/api';
import { toast } from 'sonner';

const ChatInterface: React.FC = () => {
  const { 
    chatThreadId, 
    messages, 
    addMessage, 
    isChatting, 
    setIsChatting, 
    chattingError, 
    setChattingError 
  } = useChatContext();
  
  const [query, setQuery] = useState('');
  const [streamedResponse, setStreamedResponse] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, streamedResponse]);
  
  // Auto-focus input when chat starts
  useEffect(() => {
    if (chatThreadId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatThreadId]);
  
  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSend = async () => {
    if (!query.trim() || !chatThreadId || isChatting) return;
    
    try {
      setIsChatting(true);
      setChattingError(null);
      setStreamedResponse('');
      
      addMessage({
        userMessage: query,
        agentResponse: ''
      });
      
      setQuery('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
      
      const response = await sendChatMessage(
        chatThreadId,
        query,
        (chunk) => {
          setStreamedResponse((prev) => prev + chunk);
        }
      );
      addMessage({
        userMessage: query,
        agentResponse: response
      });
      
      
      
      setStreamedResponse('');
    } catch (error) {
      console.error('Chat error:', error);
      setChattingError(error instanceof Error ? error.message : 'Failed to send message');
      toast.error('Error sending message. Please try again.');
    } finally {
      setIsChatting(false);
    }
  };
 
  
  // Check if chat is ready
  if (!chatThreadId) {
    return null;
  }
  
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[800px] rounded-xl overflow-hidden border border-metal-light/20 metal-surface shadow-inner-light mt-24">
      <div className="p-4 border-b border-metal-light/20 backdrop-blur-md">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3">
            <Bot size={20} className="text-neon-blue" />
          </div>
          <div>
            <h3 className="text-white font-medium">Document Assistant</h3>
            <p className="text-sm text-metal-light">Ask questions about your document</p>
          </div>
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 thin-scrollbar"
      >
        {messages.length === 0 && !streamedResponse ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Bot size={30} className="text-metal-light" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Start the conversation</h3>
            <p className="text-metal-light max-w-md">
              Ask questions about your document to get instant, accurate answers. Try questions like "What's the main point?" or "Summarize the key findings."
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start justify-end">
                  <div className="max-w-[80%] bg-neon-blue/20 text-white p-3 rounded-tl-lg rounded-tr-lg rounded-bl-lg chat-message">
                    <p>{message.userMessage}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-2 mt-1">
                    <User size={18} className="text-white" />
                  </div>
                </div>
                
                {message.agentResponse && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-2 mt-1">
                      <Bot size={18} className="text-neon-blue" />
                    </div>
                    <div className="max-w-[80%] bg-white/5 text-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg chat-message">
                      <p className="whitespace-pre-wrap">{message.agentResponse}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {streamedResponse && (
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-2 mt-1">
                  <Bot size={18} className="text-neon-blue" />
                </div>
                <div className="max-w-[80%] bg-white/5 text-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg chat-message">
                  <p className="whitespace-pre-wrap">{streamedResponse}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Chat input */}
      <div className="p-4 border-t border-metal-light/20">
        {chattingError && (
          <div className="mb-3 p-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            Error: {chattingError}
          </div>
        )}
        
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={query}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your document..."
              className="w-full text-white bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-neon-blue/50 min-h-[44px] max-h-[150px] thin-scrollbar resize-none input-highlight"
              rows={1}
              disabled={isChatting}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!query.trim() || isChatting}
            className={`p-3 rounded-lg transition-colors ${
              query.trim() && !isChatting
                ? 'bg-neon-blue text-black hover:bg-neon-blue/90'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            {isChatting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
