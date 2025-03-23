
import React, { useEffect, useState } from 'react';
import { History, RefreshCw, Clock } from 'lucide-react';
import { useChatContext } from '@/context/ChatContext';
import { getChatHistory } from '@/services/api';

interface HistoryItem {
  userMessage: string;
  agentResponse: string;
}

const HistoryView: React.FC = () => {
  const { chatThreadId, setMessages } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchHistory = async () => {
    if (!chatThreadId) return;
    
    try {
      setLoading(true);
      setError(null);
      const historyData = await getChatHistory(chatThreadId);
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatThreadId) {
      fetchHistory();
    }
  }, [chatThreadId]);

  const handleRestoreChat = () => {
    if (history.length > 0) {
      setMessages(history);
    }
  };

  if (!chatThreadId || history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History size={20} className="text-metal-light mr-2" />
          <h3 className="text-lg font-medium text-white">Chat History</h3>
        </div>
        
        <button 
          onClick={fetchHistory}
          className="flex items-center text-metal-light hover:text-white transition-colors text-sm"
          disabled={loading}
        >
          <RefreshCw size={16} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {error ? (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      ) : (
        <>
          <div className="metal-surface rounded-lg border border-metal-light/20 overflow-hidden max-h-[400px] overflow-y-auto thin-scrollbar">
            {history.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border-b border-metal-light/20 transition-colors hover:bg-white/5 ${
                  index === history.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-full bg-metal-accent/30 flex items-center justify-center mr-2">
                    <Clock size={12} className="text-metal-light" />
                  </div>
                  <p className="text-sm text-metal-light">Question {index + 1}</p>
                </div>
                <h4 className="text-white font-medium mb-1 line-clamp-1">
                  {item.userMessage}
                </h4>
                <p className="text-metal-light line-clamp-2 text-sm">
                  {item.agentResponse}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={handleRestoreChat}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-colors"
            >
              Restore Chat
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryView;
