import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import IslamicPattern from './IslamicPattern';
import ShootingStars from './ShootingStars';
import MosqueSilhouette from './MosqueSilhouette';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 bg-midnight">
      <ShootingStars />
      <IslamicPattern opacity={0.03} />
      <MosqueSilhouette />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-ivory to-gold mb-6 text-glow leading-tight pb-2 px-2 sm:px-0">
            Tamil Nadu Shia Muslim Jamaat
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px bg-gold/30 w-16 md:w-32"></div>
            <h2 className="text-xl md:text-3xl font-serif text-champagne uppercase tracking-[0.2em]">
              1st Year Completion Report
            </h2>
            <div className="h-px bg-gold/30 w-16 md:w-32"></div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-muted font-light tracking-wide mb-12 italic"
          >
            "Serving with Faith • Unity • Justice • Humanity"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a 
              href="#journey" 
              className="px-8 py-4 bg-gold text-midnight font-bold rounded-full hover:bg-champagne hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,98,0.4)] tracking-wide uppercase text-sm"
            >
              Explore Our Journey
            </a>
            <a 
              href="#impact" 
              className="px-8 py-4 bg-transparent border border-gold/50 text-gold font-bold rounded-full hover:bg-gold/10 transition-all tracking-wide uppercase text-sm"
            >
              View Annual Report
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/50"
      >
        <span className="text-xs tracking-widest uppercase font-semibold">Scroll to explore</span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
