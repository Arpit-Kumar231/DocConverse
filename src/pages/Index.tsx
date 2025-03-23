
import React from 'react';
import { ChatProvider } from '@/context/ChatContext';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';
import HistoryView from '@/components/HistoryView';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-1">
          <Hero />

          <section id="demo" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-metal-dark/50 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block metal-surface p-2 px-4 rounded-full text-sm font-medium mb-3">
                  <span className="text-neon-blue">Interactive Demo</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Try It Yourself
                </h2>
                <p className="text-metal-light max-w-xl mx-auto">
                  Upload a document and start asking questions to experience the power of our document intelligence system.
                </p>
              </div>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                <FileUpload />
                <HistoryView />
              </div>
            </div>
          </section>
          
          
          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block metal-surface p-2 px-4 rounded-full text-sm font-medium mb-3">
                  <span className="text-neon-blue">Features</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Advanced Document Intelligence
                </h2>
                <p className="text-metal-light max-w-xl mx-auto">
                  Transform how you interact with documents using Retrieval Augmented Generation
                </p>
              </div>
              
              
            </div>
          </section>
          
          
          <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block metal-surface p-2 px-4 rounded-full text-sm font-medium mb-3">
                  <span className="text-neon-blue">Process</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  How It Works
                </h2>
                <p className="text-metal-light max-w-xl mx-auto">
                  Our sophisticated system processes documents in three simple steps.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <ProcessStep 
                  number={1}
                  title="Upload Document"
                  description="Upload your document through our simple interface. We support PDF, DOCX, and TXT formats."
                />
                <ProcessStep 
                  number={2}
                  title="AI Processing"
                  description="Our AI system analyzes the document, extracting key information and storing it in a vector database."
                />
                <ProcessStep 
                  number={3}
                  title="Start Chatting"
                  description="Ask questions or request information about your document through our intuitive chat interface."
                />
              </div>
            </div>
          </section>
          
          
        </main>
        
        <Footer />
      </div>
  );
};



const ProcessStep: React.FC<{ number: number; title: string; description: string }> = ({ 
  number, 
  title, 
  description 
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-2xl font-bold text-white mb-4">
        {number}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-medium text-white">{title}</h3>
        <p className="text-metal-light">{description}</p>
      </div>
    </div>
  );
};



export default Index;
