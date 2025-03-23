import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gradient">Momentum RAG</h1>
        </div>

        {isMobile ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <div className="flex space-x-6">
            <NavLink href="#demo">Demo</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
          </div>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg py-4 border-t border-metal-light/10 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="#demo" onClick={() => setIsMenuOpen(false)}>
              Demo
            </NavLink>
            <NavLink href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative text-white/80 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-neon-blue/70 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
  >
    {children}
  </a>
);

export default NavBar;
