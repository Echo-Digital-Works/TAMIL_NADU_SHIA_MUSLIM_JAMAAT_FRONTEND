import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Moon: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  return (
    <motion.div 
      className="absolute top-20 right-[10%] md:right-[20%] w-32 h-32 md:w-64 md:h-64 rounded-full pointer-events-none z-0"
      style={{ y: yPos, opacity }}
    >
      {/* Crescent Moon using box-shadow inset hack or a clean SVG */}
      <div className="relative w-full h-full">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_30px_rgba(240,217,154,0.4)]">
          <path 
            d="M160,100 A60,60 0 1,1 100,40 A50,50 0 1,0 150,90 Z" 
            fill="#F0D99A" 
            opacity="0.9"
            transform="rotate(-20 100 100)"
          />
        </svg>
        <div className="absolute inset-0 bg-gold/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default Moon;
