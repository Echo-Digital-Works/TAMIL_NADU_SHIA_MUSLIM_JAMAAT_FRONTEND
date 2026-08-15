import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-4"
          >
            <div className="w-8 h-px bg-gold/50"></div>
            Empowering the Future
            <div className="w-8 h-px bg-gold/50"></div>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-ivory font-bold mb-6"
          >
            Educational Support & Encouragement
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light text-lg"
          >
            We believe that education is the foundation of a strong and just society. During our first year, we prioritized supporting students in their academic journeys.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-10 flex flex-col items-center text-center group"
          >
            <div className="decorative-corner decorative-corner-tl"></div>
            <div className="decorative-corner decorative-corner-br"></div>
            
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/40 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,98,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,98,0.3)]">
              <BookOpen size={32} className="text-gold" />
            </div>
            <h4 className="font-serif text-5xl text-gold mb-2 group-hover:text-champagne transition-colors drop-shadow-[0_0_10px_rgba(212,175,98,0.2)]">200</h4>
            <h5 className="text-lg text-ivory font-medium mb-4 uppercase tracking-widest">Students Supported</h5>
            <p className="text-muted font-light leading-relaxed group-hover:text-ivory/90 transition-colors">Provided essential school bags and notebooks to ensure students have the tools they need to succeed.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="luxury-card p-10 flex flex-col items-center text-center group"
          >
            <div className="decorative-corner decorative-corner-tr"></div>
            <div className="decorative-corner decorative-corner-bl"></div>

            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/40 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,98,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,98,0.3)]">
              <Award size={32} className="text-gold" />
            </div>
            <h4 className="font-serif text-5xl text-gold mb-2 group-hover:text-champagne transition-colors drop-shadow-[0_0_10px_rgba(212,175,98,0.2)]">150</h4>
            <h5 className="text-lg text-ivory font-medium mb-4 uppercase tracking-widest">Academic Achievers</h5>
            <p className="text-muted font-light leading-relaxed group-hover:text-ivory/90 transition-colors">Awarded special prizes and ₹2,000 incentives each to students passing 10th and 12th grades with high marks.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Education;
