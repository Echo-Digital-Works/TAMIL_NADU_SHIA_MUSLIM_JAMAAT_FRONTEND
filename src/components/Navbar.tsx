import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSiteData } from '../context/SiteDataContext';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Mission', href: '#mission' },
  { name: 'Journey', href: '#journey' },
  { name: 'Mosque', href: '#mosque-gallery' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const { branding, getImageUrl } = useSiteData();
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
          <div className="bg-white p-1 rounded-lg border-2 border-gold/50 shadow-[0_0_15px_rgba(212,175,98,0.3)] flex items-center justify-center overflow-hidden">
            <img 
              src={getImageUrl(branding?.logoUrl || '/logo.jpeg')} 
              alt="Jamaat Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith('/logo.jpeg')) {
                  target.src = '/logo.jpeg';
                }
              }}
            />
          </div>
          <span className="font-serif text-lg md:text-xl lg:text-2xl font-bold text-gold tracking-wide">
            <span className="hidden sm:inline">{branding?.name || 'Tamil Nadu Shia Muslim Jamaat'}</span>
            <span className="sm:hidden">{branding?.shortName || 'TNSMJ'}</span>
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

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gold focus:outline-none p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-gold/20 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-ivory hover:text-gold tracking-wider uppercase py-2 border-b border-gold/10"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center py-3 mt-4 bg-gold text-midnight font-bold rounded-full uppercase tracking-wider text-sm"
          >
            Support Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
