import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const objectives = [
  { title: "Unity", desc: "To unite all Muslims without any division, fostering a resilient and inseparable brotherhood across all communities." },
  { title: "Religious Harmony", desc: "To maintain and promote religious harmony in society, building bridges of understanding and mutual respect." },
  { title: "Respect for Law", desc: "To respect and abide by the laws of the Central and State Governments, serving as exemplary and responsible citizens." },
  { title: "Propagation of Tawheed", desc: "To spread the message of Monotheism among the people, illuminating hearts with the divine truth of the Almighty." },
  { title: "Glorifying Ahlul Bayt", desc: "To propagate the virtues and greatness of the Prophet's family, ensuring their noble legacy guides future generations." },
  { title: "Wilayat of Ali", desc: "To convey the Wilayat of Imam Ali (AS), illuminating the path of spiritual leadership and divine guidance." },
  { title: "Message of Karbala", desc: "To implement the objectives and sacrifices of Karbala, standing firmly for justice and truth in every era." },
  { title: "Educational Assistance", desc: "To provide educational support to poor and underprivileged students, empowering them to build a brighter future." },
  { title: "Social Service", desc: "To support poor mothers and senior citizens, ensuring they receive the dignity, care, and compassion they deserve." },
  { title: "Medical Service", desc: "To conduct free medical camps, bringing essential healthcare and relief to the most vulnerable members of society." },
  { title: "Cleanliness Drive", desc: "To engage in cleanliness activities in schools, colleges, libraries, and hospitals, promoting a pure and healthy environment." },
  { title: "Legal Protection", desc: "To provide clarification against those who spread defamation about Shias, and to address them legally if necessary to protect our community's honor." }
];

const Mission: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // Used to force progress bar reset

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % objectives.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [timerKey]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    setTimerKey(prev => prev + 1); // Reset the timer when manually clicked
  };

  return (
    <section id="mission" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background glow for luxury feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Aim & Guidance
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-ivory font-bold max-w-2xl mx-auto"
          >
            Objectives of the Jamaat
          </motion.h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto items-stretch">
          
          {/* Left: Interactive Menu */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col relative"
          >
            {/* Custom glowing scrollbar track */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold/10 rounded-full"></div>
            
            {/* Active Indicator Line */}
            <motion.div 
              className="absolute left-[-1px] w-[4px] bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,98,0.8)]"
              animate={{ 
                top: `${(activeIndex * 100) / objectives.length}%`, 
                height: `${100 / objectives.length}%` 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            
            <div className="flex flex-col h-full justify-between">
              {objectives.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => handleManualSelect(i)}
                  className={`text-left py-2.5 pl-6 pr-4 transition-all duration-300 relative group flex items-center
                    ${activeIndex === i ? 'text-gold' : 'text-muted hover:text-ivory'}`}
                >
                  <span className={`font-serif font-bold w-8 transition-colors ${activeIndex === i ? 'text-gold' : 'text-gold/40 group-hover:text-gold/70'}`}>
                    {String(i+1).padStart(2, '0')}.
                  </span>
                  <span className={`text-sm md:text-base font-medium tracking-wide ${activeIndex === i ? 'scale-105 origin-left' : ''} transition-transform`}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Rich Display Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 relative h-[280px] md:h-[320px] bg-gradient-to-br from-navy/60 to-midnight border border-gold/20 rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(212,175,98,0.1)] group"
          >
            {/* Decorative Corner Flairs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center"
              >
                {/* Huge Watermark Number */}
                <div className="absolute right-4 bottom-4 md:right-6 md:bottom-2 text-[100px] md:text-[140px] font-serif font-bold text-white/[0.03] leading-none pointer-events-none select-none">
                  {String(activeIndex + 1).padStart(2, '0')}
                </div>
                
                <h4 className="font-serif text-2xl md:text-3xl text-gold mb-4 relative z-10 drop-shadow-sm leading-tight">
                  {objectives[activeIndex].title}
                </h4>
                
                <div className="w-12 md:w-16 h-px bg-gold/50 mb-4 md:mb-6 relative z-10"></div>
                
                <p className="text-lg md:text-xl text-ivory/90 font-normal leading-relaxed max-w-xl relative z-10 pr-12">
                  {objectives[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Progress Bar for Auto-play */}
            <div className="absolute bottom-0 left-0 h-1 bg-gold/20 w-full">
              <motion.div 
                key={`progress-${activeIndex}-${timerKey}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gold/80"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Mission;
