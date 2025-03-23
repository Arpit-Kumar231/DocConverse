
import React from 'react';
import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-metal-light/20 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gradient">Momentum RAG</h2>
            </div>
            <p className="text-metal-light">
              Advanced document processing and chat interface powered by AI. Upload any document and start conversing with its content.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://github.com/Arpit-Kumar231" icon={<Github size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="mailto:ak30062004@gmail.com" icon={<Mail size={18} />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#demo">Demo</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
            </ul>
          </div>
          
          
        </div>
        
        <div className="mt-12 pt-6 border-t border-metal-light/20 text-center text-metal-light text-sm">
          <p>© {new Date().getFullYear()} Arpit Kumar</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => {
  return (
    <a 
      href={href}
      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-metal-light hover:text-white hover:bg-white/10 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

const FooterLink: React.FC<{ href: string; external?: boolean; children: React.ReactNode }> = ({ 
  href, 
  external = false, 
  children 
}) => {
  return (
    <li>
      <a 
        href={href}
        className="text-metal-light hover:text-white transition-colors inline-flex items-center"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external && <ExternalLink size={14} className="ml-1" />}
      </a>
    </li>
  );
};

export default Footer;
