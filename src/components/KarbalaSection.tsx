import React from 'react';
import { motion } from 'framer-motion';

const KarbalaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative border-t border-red-900/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-950/10 via-midnight/40 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-8"
        >
          <div className="w-16 h-16 rounded-full border border-red-900/30 flex items-center justify-center mx-auto mb-6 bg-red-950/20 shadow-[0_0_20px_rgba(127,29,29,0.2)]">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-red-700/80">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-sm text-red-500/80 font-semibold tracking-widest uppercase">
            A Legacy of Sacrifice
          </h2>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl text-ivory font-bold mb-12"
        >
          Karbala
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="luxury-card p-8 border-t-2 border-red-900/40 text-left group hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(153,27,27,0.2)]"
          >
            <h4 className="font-serif text-3xl text-gold mb-4 group-hover:text-red-400 transition-colors">Muharram Campaign</h4>
            <p className="text-muted font-light leading-relaxed group-hover:text-ivory transition-colors">
              Digital banners displayed across central locations in Chennai commemorating the timeless sacrifice of Karbala and Imam Hussain (AS).
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="luxury-card p-8 border-t-2 border-red-900/40 text-left group hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(153,27,27,0.2)]"
          >
            <h4 className="font-serif text-3xl text-gold mb-4 group-hover:text-red-400 transition-colors">Awareness Literature</h4>
            <p className="text-muted font-light leading-relaxed group-hover:text-ivory transition-colors">
              5,000 copies of the profound booklet "Karbala — A History of Sacrifice" were successfully distributed across more than 10 mosques.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="luxury-card p-8 border-t-2 border-red-900/40 text-left group hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(153,27,27,0.2)]"
          >
            <h4 className="font-serif text-3xl text-gold mb-4 group-hover:text-red-400 transition-colors">10-Day Sabeel</h4>
            <p className="text-muted font-light leading-relaxed group-hover:text-ivory transition-colors">
              Honoring the thirst of the martyrs, juice, buttermilk, and cold water were continuously distributed to the public on Peters Road during the first 10 days of Muharram.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default KarbalaSection;
