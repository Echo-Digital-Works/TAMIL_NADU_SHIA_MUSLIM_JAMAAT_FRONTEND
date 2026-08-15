import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Mission', href: '#mission' },
  { name: 'Journey', href: '#journey' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 md:gap-4">
          <div className="bg-white p-1 rounded-lg border-2 border-gold/50 shadow-[0_0_15px_rgba(212,175,98,0.3)]">
            <img 
              src="/logo.jpeg" 
              alt="Jamaat Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>
          <span className="font-serif text-lg md:text-xl lg:text-2xl font-bold text-gold tracking-wide">
            <span className="hidden sm:inline">Tamil Nadu Shia Muslim Jamaat</span>
            <span className="sm:hidden">TNSMJ</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-ivory/80 hover:text-gold transition-colors tracking-widest uppercase"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 bg-gold/10 border border-gold/50 text-gold rounded-full hover:bg-gold hover:text-midnight transition-all text-sm uppercase tracking-wider font-semibold">
            Support Us
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gold p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 glass border-t border-ivory/10 transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
      )}>
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-ivory hover:text-gold transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
