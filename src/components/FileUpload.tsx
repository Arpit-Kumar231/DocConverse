
import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, XCircle, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { processDocument, startChatSession } from '@/services/api';
import { useChatContext } from '@/context/ChatContext';
import { useNavigate } from 'react-router-dom';

const FileUpload: React.FC = () => {
  const { 
    setAssetId, 
    setChatThreadId, 
    isProcessing, 
    setIsProcessing,
    processingError,
    setProcessingError
  } = useChatContext();
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setIsProcessing(true);
      setProcessingError(null);
      
      toast.info('Processing document...', { duration: 2000 });
      const assetId = await processDocument(file);
      setAssetId(assetId);
      
      toast.info('Starting chat session...', { duration: 2000 });
      const chatThreadId = await startChatSession(assetId);
      setChatThreadId(chatThreadId);
      
      toast.success('Document processed successfully!', { duration: 3000 });
      navigate('/chat')

    } catch (error) {
      console.error('Upload error:', error);
      setProcessingError(error instanceof Error ? error.message : 'Failed to process document');
      toast.error('Error processing document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full border-2 border-dashed rounded-xl p-8 transition-all duration-300 metal-surface ${
          isDragging 
            ? 'border-neon-blue/80 bg-neon-blue/5' 
            : 'border-metal-light/30 hover:border-metal-light/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept=".pdf,.docx,.txt"
        />
        
        <div className="flex flex-col items-center justify-center gap-4">
          {file ? (
            <>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <FileText size={32} className="text-neon-blue" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-white truncate max-w-xs">
                  {file.name}
                </h3>
                <p className="text-metal-light">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex space-x-3 mt-2">
                <button 
                  onClick={handleClearFile}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center transition-colors"
                  disabled={isProcessing}
                >
                  <XCircle size={18} className="mr-2" />
                  Clear
                </button>
                <button 
                  onClick={handleUpload}
                  className={`px-4 py-2 rounded-lg bg-neon-blue hover:bg-neon-blue/90 text-black font-medium flex items-center transition-colors ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} className="mr-2" />
                      Process Document
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center beam-animation">
                <Upload size={36} className="text-metal-light" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-white">Upload your document</h3>
                <p className="text-metal-light mt-2">
                  Drop your file here, or{' '}
                  <button 
                    className="text-neon-blue hover:text-neon-blue/80 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </button>
                </p>
                <p className="text-metal-light/70 text-sm mt-1">
                  Supports PDF, DOCX, TXT files
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {processingError && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
          <div className="flex items-start">
            <XCircle size={20} className="mr-2 shrink-0 mt-0.5" />
            <p>{processingError}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
