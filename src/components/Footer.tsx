import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03050B] py-16 border-t border-ivory/5 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          <div className="text-center md:text-left max-w-sm flex flex-col items-center md:items-start">
            <div className="bg-white p-1.5 rounded-xl border-2 border-gold/30 shadow-[0_0_20px_rgba(212,175,98,0.2)] mb-4">
              <img 
                src="/logo.jpeg" 
                alt="Jamaat Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gold mb-2">
              Tamil Nadu Shia Muslim Jamaat
            </h2>
            <p className="text-muted text-sm tracking-widest uppercase mb-6">
              Faith • Unity • Justice • Humanity
            </p>
            <p className="text-ivory/50 text-xs leading-relaxed">
              Dedicated to serving the community through humanitarian aid, educational support, and upholding justice and brotherhood.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <h4 className="text-ivory font-semibold mb-4 uppercase tracking-wider text-sm">Explore</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-muted hover:text-gold text-sm transition-colors">About</a></li>
                <li><a href="#journey" className="text-muted hover:text-gold text-sm transition-colors">Our Journey</a></li>
                <li><a href="#mission" className="text-muted hover:text-gold text-sm transition-colors">Activities</a></li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="text-ivory font-semibold mb-4 uppercase tracking-wider text-sm">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#impact" className="text-muted hover:text-gold text-sm transition-colors">Impact</a></li>
                <li><a href="#contact" className="text-muted hover:text-gold text-sm transition-colors">Contact</a></li>
                <li><a href="#contact" className="text-gold hover:text-champagne text-sm transition-colors font-medium">Support Us</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 text-center flex flex-col items-center justify-center">
          <p className="font-serif text-xl text-gold mb-2">Wassalam</p>
          <p className="text-muted text-sm tracking-wider">Tamil Nadu Shia Muslim Jamaat</p>
          <p className="text-ivory/30 text-xs mt-6">&copy; {new Date().getFullYear()} Tamil Nadu Shia Muslim Jamaat. All rights reserved.</p>
          <p className="text-ivory/60 text-xs mt-3 tracking-widest uppercase flex items-center justify-center gap-2">
            Developed by <span className="text-gold font-bold drop-shadow-[0_0_8px_rgba(212,175,98,0.8)]">Echo Digital Works</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
