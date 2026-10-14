import React from 'react';
import { motion } from 'framer-motion';
import { quotes as defaultQuotes } from '../data/jamaatData';
import { useSiteData } from '../context/SiteDataContext';

const Brotherhood: React.FC = () => {
  const { content } = useSiteData();
  const pillars = content.brotherhood?.pillars || ['Faith', 'Justice', 'Brotherhood', 'Service'];
  const imamAliQuote = content.quotes?.imamAli || defaultQuotes.imamAli;

  return (
    <section className="py-16 md:py-24 relative border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-gold tracking-widest uppercase font-semibold mb-8">
            {pillars.map((pillar, i) => (
              <React.Fragment key={i}>
                <span>{pillar}</span>
                {i < pillars.length - 1 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto py-16 px-8 relative"
        >
          {/* Subtle glowing background behind quote */}
          <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
          
          <p className="relative z-10 font-serif text-3xl md:text-5xl text-ivory leading-tight mb-8">
            "{imamAliQuote.text}"
          </p>
          
          <div className="relative z-10 flex items-center justify-center gap-4">
            <div className="h-px bg-gold/50 w-8"></div>
            <p className="text-gold font-semibold tracking-widest uppercase text-sm">
              {imamAliQuote.source}
            </p>
            <div className="h-px bg-gold/50 w-8"></div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Brotherhood;
