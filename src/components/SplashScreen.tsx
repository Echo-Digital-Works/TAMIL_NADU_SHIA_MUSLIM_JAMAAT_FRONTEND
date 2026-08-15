import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Fast 2.0 seconds display time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-midnight to-midnight pointer-events-none"></div>

      {/* Splash Screen Fast Shooting Stars */}
      <style>
        {`
          @keyframes splashShootingStar {
            0% { transform: rotate(135deg) translateX(0); opacity: 0; }
            5% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: rotate(135deg) translateX(3000px); opacity: 0; }
          }
          .splash-star {
            position: absolute;
            width: 250px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 98, 0.9), rgba(255,255,255,1));
            opacity: 0;
            pointer-events: none;
            z-index: 5;
          }
          .splash-star::after {
            content: '';
            position: absolute;
            right: 0;
            top: -2px;
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 25px 5px rgba(212, 175, 98, 1);
          }
        `}
      </style>
      
      {/* 4 Lightning Fast Shooting Stars */}
      <div className="splash-star" style={{ top: '-10%', left: '30%', animation: 'splashShootingStar 0.8s linear forwards', animationDelay: '0.2s' }}></div>
      <div className="splash-star" style={{ top: '-5%', left: '60%', animation: 'splashShootingStar 0.9s linear forwards', animationDelay: '0.4s' }}></div>
      <div className="splash-star" style={{ top: '15%', left: '110%', animation: 'splashShootingStar 0.8s linear forwards', animationDelay: '0.6s' }}></div>
      <div className="splash-star" style={{ top: '-15%', left: '80%', animation: 'splashShootingStar 0.9s linear forwards', animationDelay: '0.8s' }}></div>


      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative w-48 h-48 md:w-64 md:h-64 mb-10 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-[0_0_40px_rgba(212,175,98,0.15)] z-10 bg-white p-2 flex items-center justify-center"
      >
        <img 
          src="/logo.jpeg" 
          alt="Tamil Nadu Shia Muslim Jamaat" 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center z-10"
      >
        <h2 className="font-arabic text-4xl md:text-5xl text-gold mb-6 drop-shadow-[0_0_10px_rgba(212,175,98,0.4)]">
          السلام عليكم ورحمة الله وبركاته
        </h2>
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="w-12 h-px bg-gold/50"></div>
          <p className="font-serif text-xl md:text-2xl text-ivory tracking-widest uppercase">
            Assalamu Alaikum
          </p>
          <div className="w-12 h-px bg-gold/50"></div>
        </div>
        <p className="text-muted text-xs md:text-sm tracking-[0.3em] uppercase">
          Peace be upon you
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
