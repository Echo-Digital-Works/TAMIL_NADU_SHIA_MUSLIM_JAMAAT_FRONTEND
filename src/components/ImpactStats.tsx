import React from 'react';
import { motion } from 'framer-motion';
import { statistics } from '../data/jamaatData';

const ImpactStats: React.FC = () => {
  return (
    <section id="impact" className="py-16 md:py-24 relative border-y border-gold/10">
      <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {statistics.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold font-bold mb-4 drop-shadow-[0_0_10px_rgba(212,175,98,0.3)]">
                {stat.value}<span className="text-3xl lg:text-4xl">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-ivory/80 uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
