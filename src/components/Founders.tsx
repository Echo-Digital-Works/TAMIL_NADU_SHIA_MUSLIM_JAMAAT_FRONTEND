import React from 'react';
import { motion } from 'framer-motion';

const founders = [
  {
    id: 1,
    name: "M. Mohammed Akil",
    role: "President",
    image: "/founder/founder-1.jpeg?v=2"
  },
  {
    id: 2,
    name: "Hyder",
    role: "Secretary",
    image: "/founder/founder-2.jpeg?v=2"
  },
  {
    id: 3,
    name: "Syed Hasan Mohammed",
    role: "Treasurer",
    image: "/founder/founder-3.jpeg?v=2"
  }
];

const Founders: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-midnight">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Office Bearers
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-ivory font-bold mb-6"
          >
            Our Founders
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light max-w-2xl mx-auto italic text-lg"
          >
            Tamil Nadu Shia Muslim Jamaat
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex flex-col items-center group"
            >
              {/* Image Container with rings */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-8 p-3 shadow-[0_0_40px_rgba(212,175,98,0.1)] group-hover:shadow-[0_0_60px_rgba(212,175,98,0.2)] transition-all duration-700">
                {/* Outer dashed border */}
                <div className="absolute inset-0 border-2 border-dashed border-gold/30 rounded-full animate-[spin_30s_linear_infinite] group-hover:border-gold/60"></div>
                
                {/* Inner solid border */}
                <div className="absolute inset-2 border border-gold/20 rounded-full group-hover:border-gold/40 transition-colors duration-500"></div>

                <div className="w-full h-full rounded-full overflow-hidden bg-navy/50 relative">
                  {/* Overlay tint */}
                  <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="text-center">
                <h4 className="font-serif text-2xl text-ivory mb-2 group-hover:text-gold transition-colors duration-300">
                  {founder.name}
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-6 bg-gold/50"></div>
                  <p className="text-gold tracking-widest uppercase text-sm font-semibold">
                    {founder.role}
                  </p>
                  <div className="h-px w-6 bg-gold/50"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
