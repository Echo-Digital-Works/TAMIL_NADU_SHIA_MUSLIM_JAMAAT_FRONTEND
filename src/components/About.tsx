import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

const About: React.FC = () => {
  const { content } = useSiteData();
  const about = content.about;

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Animated Number Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full aspect-square max-w-[320px] md:max-w-[400px] mx-auto flex items-center justify-center rounded-full border border-gold/30 bg-gradient-to-b from-navy/60 to-midnight/90 backdrop-blur-xl shadow-[0_0_60px_rgba(212,175,98,0.15)] group hover:shadow-[0_0_80px_rgba(212,175,98,0.25)] hover:border-gold/50 transition-all duration-700">
              
              {/* Elegant decorative rings */}
              <div className="absolute inset-3 rounded-full border border-gold/20"></div>
              <div className="absolute inset-6 rounded-full border border-gold/10"></div>
              
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent opacity-70"></div>
              
              <div className="text-center relative z-10 flex flex-col items-center justify-center mt-4">
                <span className="block font-serif text-[120px] md:text-[150px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-gold to-yellow-800 font-bold drop-shadow-sm filter">
                  {about?.milestoneNumber || '1'}
                </span>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-8 h-px bg-gold/50"></div>
                  <span className="text-xl md:text-2xl text-ivory tracking-[0.4em] uppercase font-light">
                    {about?.milestoneUnit || 'Year'}
                  </span>
                  <div className="w-8 h-px bg-gold/50"></div>
                </div>
                <span className="text-xs text-gold/60 uppercase tracking-[0.3em] mt-6">
                  {about?.milestoneLabel || 'Milestone'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-sm text-gold font-semibold tracking-widest uppercase mb-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-px bg-gold/50 hidden lg:block"></div>
              {about?.badge || '1st Year Completion'}
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-ivory font-bold mb-8 leading-tight">
              {about?.title || 'A Journey of Faith and Dedication'}
            </h3>
            <p className="text-lg text-muted leading-relaxed font-light mb-8">
              {about?.leadText || '"By the immense grace of Allah Subhanahu wa Ta\'ala, and with the prayers of Ahlul Bayt Alayhimussalam, we are honored and grateful to announce that the Tamil Nadu Shia Muslim Jamaat has successfully completed its first year."'}
            </p>
            
            <div className="grid grid-cols-2 gap-6 text-left">
              {(about?.stats || [
                { value: '200+', label: 'Students Supported' },
                { value: '2,000+', label: 'People Served' },
                { value: '10+', label: 'Mosques Reached' },
                { value: '₹5L', label: 'Humanitarian Aid' }
              ]).map((st: any, i: number) => (
                <div key={i}>
                  <h4 className="font-serif text-3xl text-champagne mb-1">{st.value}</h4>
                  <p className="text-xs uppercase tracking-wider text-muted">{st.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
