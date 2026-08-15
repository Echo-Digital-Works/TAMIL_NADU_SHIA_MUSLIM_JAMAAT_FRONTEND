import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

const Humanitarian: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm text-gold font-semibold tracking-widest uppercase mb-4 flex items-center gap-4">
              <HeartHandshake size={20} />
              Service Beyond Boundaries
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-ivory font-bold mb-8 leading-tight">
              A commitment to humanity in times of need.
            </h3>
            <p className="text-lg text-muted leading-relaxed font-light mb-8">
              True faith is demonstrated through compassionate action. When tragedy struck the Meena School in Iran resulting in the tragic loss of 167 children, the Jamaat stepped forward to aid in the reconstruction efforts.
            </p>
            <div className="inline-block p-1 bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20 rounded-2xl shadow-[0_0_40px_rgba(212,175,98,0.2)]">
              <div className="bg-navy/90 backdrop-blur-xl px-10 py-8 rounded-xl border border-gold/20 relative overflow-hidden group hover:bg-navy transition-colors">
                <div className="absolute -inset-2 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
                <p className="text-sm text-gold uppercase tracking-[0.2em] mb-3 relative z-10 font-medium">Total Contribution</p>
                <p className="font-serif text-6xl text-ivory relative z-10 drop-shadow-[0_0_15px_rgba(212,175,98,0.4)]">₹5,00,000</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square md:aspect-video lg:aspect-square bg-navy/50 border border-gold/20 rounded-3xl overflow-hidden relative group shadow-[0_0_30px_rgba(212,175,98,0.1)]">
              
              <img 
                src="/picture1.jpeg" 
                alt="Humanitarian Aid - Meena School" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              
              <div className="absolute inset-0 bg-midnight/40 group-hover:bg-midnight/20 transition-colors duration-500"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-midnight via-midnight/80 to-transparent">
                <p className="text-ivory font-serif text-lg md:text-xl text-center italic opacity-90 drop-shadow-md">
                  "As long as a person helps his brother, Allah will continue to help him."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Humanitarian;
