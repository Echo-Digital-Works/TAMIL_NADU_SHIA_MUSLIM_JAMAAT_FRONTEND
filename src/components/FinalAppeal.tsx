import React from 'react';
import { motion } from 'framer-motion';
import { quotes } from '../data/jamaatData';

const FinalAppeal: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-midnight/50 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Appeal Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold font-bold mb-8 drop-shadow-[0_0_15px_rgba(212,175,98,0.2)] leading-tight"
            >
              Together in Faith.<br/>Together in Service.
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl font-serif text-ivory italic mb-4">
                "{quotes.prophet.text}"
              </p>
              <p className="text-sm text-gold uppercase tracking-wider">— {quotes.prophet.source}</p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              We seek your continued support, prayers, and contributions to undertake many more services. We cordially invite everyone to join hands with the Jamaat and serve together.
            </motion.p>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <form 
              className="bg-navy/60 border border-gold/20 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-[0_0_40px_rgba(212,175,98,0.1)] relative overflow-hidden"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Subtle background glow for the form */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full"></div>
              
              <h3 className="font-serif text-3xl text-ivory mb-2">Get in Touch</h3>
              <p className="text-muted font-light mb-8 text-sm">Fill out the form below to connect or support our cause.</p>
              
              <div className="space-y-5 relative z-10">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full bg-midnight/50 border border-gold/20 rounded-xl px-5 py-4 text-ivory placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-midnight/50 border border-gold/20 rounded-xl px-5 py-4 text-ivory placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    required
                    className="w-full bg-midnight/50 border border-gold/20 rounded-xl px-5 py-4 text-ivory placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>
                
                <div>
                  <textarea 
                    placeholder="Your Message..." 
                    rows={4}
                    required
                    className="w-full bg-midnight/50 border border-gold/20 rounded-xl px-5 py-4 text-ivory placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 mt-2 bg-gold text-midnight font-bold rounded-xl hover:bg-champagne hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(212,175,98,0.3)] tracking-wide uppercase text-sm"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinalAppeal;
