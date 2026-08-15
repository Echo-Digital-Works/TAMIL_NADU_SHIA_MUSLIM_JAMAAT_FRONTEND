import React from 'react';
import { motion } from 'framer-motion';

const MosqueSilhouette: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-0 opacity-90">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="relative w-full h-[25vh] md:h-[30vh]"
      >
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-full drop-shadow-[0_-5px_15px_rgba(212,175,98,0.3)]" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Architectural Structures */}
          <g fill="#121D3A" stroke="rgba(212, 175, 98, 0.6)" strokeWidth="2" strokeLinejoin="round">
            
            {/* Base Platform */}
            <rect x="-100" y="280" width="1640" height="40" />
            
            {/* --- Center Grand Mosque --- */}
            {/* Main Building Body */}
            <rect x="570" y="190" width="300" height="90" />
            
            {/* Center Main Dome */}
            <path d="M 620 190 C 620 80, 720 40, 720 40 C 720 40, 820 80, 820 190 Z" />
            
            {/* Left Small Dome */}
            <path d="M 570 190 C 570 140, 610 120, 610 120 C 610 120, 650 140, 650 190 Z" />
            
            {/* Right Small Dome */}
            <path d="M 790 190 C 790 140, 830 120, 830 120 C 830 120, 870 140, 870 190 Z" />
            
            {/* Left Tall Minaret */}
            <rect x="520" y="90" width="24" height="190" />
            <rect x="514" y="140" width="36" height="8" />
            <rect x="514" y="200" width="36" height="8" />
            <polygon points="520,90 544,90 532,40" />
            
            {/* Right Tall Minaret */}
            <rect x="896" y="90" width="24" height="190" />
            <rect x="890" y="140" width="36" height="8" />
            <rect x="890" y="200" width="36" height="8" />
            <polygon points="896,90 920,90 908,40" />

            {/* --- Left Wing Building --- */}
            <rect x="280" y="220" width="220" height="60" />
            {/* Wing Dome */}
            <path d="M 330 220 C 330 160, 390 140, 390 140 C 390 140, 450 160, 450 220 Z" />
            {/* Far Left Minaret */}
            <rect x="230" y="130" width="20" height="150" />
            <rect x="226" y="180" width="28" height="6" />
            <polygon points="230,130 250,130 240,90" />

            {/* --- Right Wing Building --- */}
            <rect x="940" y="220" width="220" height="60" />
            {/* Wing Dome */}
            <path d="M 990 220 C 990 160, 1050 140, 1050 140 C 1050 140, 1110 160, 1110 220 Z" />
            {/* Far Right Minaret */}
            <rect x="1190" y="130" width="20" height="150" />
            <rect x="1186" y="180" width="28" height="6" />
            <polygon points="1190,130 1210,130 1200,90" />

            {/* Distant Horizon Structures */}
            <rect x="-50" y="250" width="250" height="30" />
            <rect x="1240" y="250" width="250" height="30" />
          </g>
          
          {/* Windows and Archways (Cutouts revealing the midnight background) */}
          <g fill="#050816">
            {/* Grand Center Arch/Door */}
            <path d="M 690 280 L 690 230 A 30 30 0 0 1 750 230 L 750 280 Z" />
            
            {/* Center Building Side Windows */}
            <path d="M 610 250 L 610 220 A 15 15 0 0 1 640 220 L 640 250 Z" />
            <path d="M 650 250 L 650 220 A 15 15 0 0 1 680 220 L 680 250 Z" />
            
            <path d="M 760 250 L 760 220 A 15 15 0 0 1 790 220 L 790 250 Z" />
            <path d="M 800 250 L 800 220 A 15 15 0 0 1 830 220 L 830 250 Z" />
            
            {/* Left Wing Archways */}
            <path d="M 320 280 L 320 250 A 12 12 0 0 1 344 250 L 344 280 Z" />
            <path d="M 354 280 L 354 250 A 12 12 0 0 1 378 250 L 378 280 Z" />
            <path d="M 388 280 L 388 250 A 12 12 0 0 1 412 250 L 412 280 Z" />
            
            {/* Right Wing Archways */}
            <path d="M 1028 280 L 1028 250 A 12 12 0 0 1 1052 250 L 1052 280 Z" />
            <path d="M 1062 280 L 1062 250 A 12 12 0 0 1 1086 250 L 1086 280 Z" />
            <path d="M 1096 280 L 1096 250 A 12 12 0 0 1 1120 250 L 1120 280 Z" />
          </g>
        </svg>
        
        {/* Glow behind the mosque */}
        <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-midnight via-navy/50 to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default MosqueSilhouette;
