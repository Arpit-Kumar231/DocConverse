
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const processDocument = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${BASE_URL}/api/documents/process`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error('Failed to process document');
    }
    
    const data = await response.json();
    return data.assetId;
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
};

export const startChatSession = async (assetId: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assetId }),
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error('Failed to start chat session');
    }
    
    const data = await response.json();
    return data.chatThreadId;
  } catch (error) {
    console.error('Error starting chat session:', error);
    throw error;
  }
};

export const sendChatMessage = async (
  chatThreadId: string, 
  query: string,
  onChunkReceived: (chunk: string) => void
): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatThreadId, query }),
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error('Failed to send chat message');
    }
    
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Response body is null');
    
    const decoder = new TextDecoder();
    let fullResponse = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      fullResponse += chunk;
      console.log(fullResponse)
      onChunkReceived(chunk);
    }
    
    return fullResponse;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export const getChatHistory = async (chatThreadId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat/history?chatThreadId=${chatThreadId}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error('Failed to get chat history');
    }
    
    const data = await response.json();
    return data.history;
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
};
