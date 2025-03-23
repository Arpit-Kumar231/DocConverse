
import React, { useEffect, useRef } from 'react';
import { ArrowRight, FileText, MessageCircle, Database } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / (innerWidth / 2) * 15;
      const moveY = (clientY - innerHeight / 2) / (innerHeight / 2) * 15;
      
      orbRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-neon-purple/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/3 bg-gradient-to-b from-transparent to-background/80 blur-xl" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-block metal-surface p-2 px-4 rounded-full text-sm font-medium bg-metal-accent/20 border border-metal-accent/30 animate-fade-in">
              <span className="text-neon-blue mr-2">New</span>
              <span className="text-white/80">Document Intelligence Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-shadow-md">
              Chat with your <span className="text-gradient">documents</span> using advanced AI
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0">
              Upload any document and instantly start a conversation with its contents. 
              Get precise answers, summaries, and insights without reading the entire file.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#demo" 
                className="btn-3d px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg shadow-neon flex items-center justify-center min-w-44 hover:shadow-neon-purple transition-all duration-300"
              >
                Try it now
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-colors duration-300 min-w-44 text-center"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="relative w-full lg:w-1/2 aspect-square max-w-xl">
            <div ref={orbRef} className="absolute inset-0 transition-transform duration-300 ease-out">
              <div className="document-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="document-3d-inner relative w-full h-full">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-neon-blue/30 rounded-full animate-rotate-slow opacity-60" />
                  
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-5/6 metal-surface rounded-lg shadow-lg overflow-hidden flex flex-col animate-float">
                    <div className="h-10 bg-metal-dark flex items-center px-4 border-b border-metal-accent/20">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="w-1/2 h-5 bg-white/10 rounded mb-3" />
                      <div className="w-3/4 h-3 bg-white/10 rounded mb-2" />
                      <div className="w-5/6 h-3 bg-white/10 rounded mb-2" />
                      <div className="w-2/3 h-3 bg-white/10 rounded mb-4" />
                      <div className="w-5/6 h-3 bg-white/10 rounded mb-2" />
                      <div className="w-3/4 h-3 bg-white/10 rounded mb-2" />
                      <div className="w-4/5 h-3 bg-white/10 rounded mb-6" />
                      <div className="w-2/3 h-5 bg-white/10 rounded mb-3" />
                      <div className="w-5/6 h-3 bg-white/10 rounded mb-2" />
                      <div className="w-4/5 h-3 bg-white/10 rounded mb-2" />
                    </div>
                  </div>
                  
                  <IconOrbit 
                    icon={<FileText size={isMobile ? 20 : 24} />} 
                    angle={30} 
                    distance={isMobile ? 150 : 200} 
                    duration={20} 
                    color="neon-blue"
                  />
                  <IconOrbit 
                    icon={<MessageCircle size={isMobile ? 20 : 24} />} 
                    angle={150} 
                    distance={isMobile ? 150 : 200} 
                    duration={24} 
                    color="neon-purple"
                  />
                  <IconOrbit 
                    icon={<Database size={isMobile ? 20 : 24} />} 
                    angle={270} 
                    distance={isMobile ? 150 : 200} 
                    duration={28} 
                    color="neon-pink"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IconOrbitProps {
  icon: React.ReactNode;
  angle: number;
  distance: number;
  duration: number;
  color: 'neon-blue' | 'neon-purple' | 'neon-pink';
}

const IconOrbit: React.FC<IconOrbitProps> = ({ icon, angle, distance, duration, color }) => {
  const colorMap = {
    'neon-blue': 'bg-neon-blue shadow-neon text-black',
    'neon-purple': 'bg-neon-purple shadow-neon-purple text-white',
    'neon-pink': 'bg-neon-pink shadow-neon text-white'
  };

  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        animation: `orbit ${duration}s linear infinite`,
      }}
    >
      <div 
        className={`absolute flex items-center justify-center w-12 h-12 rounded-full ${colorMap[color]}`}
        style={{
          transform: `rotate(${angle}deg) translateX(${distance}px) rotate(-${angle}deg)`,
        }}
      >
        {icon}
      </div>
    </div>
  );
};

const orbitStyle = document.createElement('style');
orbitStyle.innerHTML = `
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(orbitStyle);

export default Hero;
