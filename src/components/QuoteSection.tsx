import React from 'react';
import { motion } from 'framer-motion';
import { quotes } from '../data/jamaatData';

const QuoteSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-navy/30 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h3 className="font-arabic text-3xl md:text-5xl text-gold mb-6">
            بسم الله الرحمن الرحيم
          </h3>
          <p className="text-sm md:text-base text-muted uppercase tracking-[0.2em]">
            In the Name of Allah, The Most Gracious, The Most Merciful
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="glass-card p-8 md:p-16 relative"
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30"></div>

          <p className="font-serif text-2xl md:text-4xl text-ivory leading-relaxed mb-6 italic">
            "{quotes.quran.text}"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gold/50 w-12"></div>
            <p className="text-gold font-semibold tracking-wider text-sm">
              {quotes.quran.source}
            </p>
            <div className="h-px bg-gold/50 w-12"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
