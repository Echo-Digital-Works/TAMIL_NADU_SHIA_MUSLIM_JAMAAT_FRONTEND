import React from 'react';
import { motion } from 'framer-motion';
import { activities } from '../data/jamaatData';
import { 
  Vote, Globe, Utensils, Droplet, 
  BookOpen, Users, GraduationCap, 
  Flag, Book, Image as ImageIcon, 
  FileText, CupSoda 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  vote: <Vote />, globe: <Globe />, utensils: <Utensils />, droplet: <Droplet />,
  'book-open': <BookOpen />, users: <Users />, 'graduation-cap': <GraduationCap />,
  flag: <Flag />, book: <Book />, image: <ImageIcon />, 'file-text': <FileText />,
  'cup-soda': <CupSoda />
};

const Timeline: React.FC = () => {
  return (
    <section id="journey" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Our Journey
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-ivory font-bold"
          >
            One Year of Service
          </motion.h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {activities.map((activity, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  
                  {/* Left Side (Empty for odd, Content for even on Desktop) */}
                  <div className={`hidden md:block w-1/2 pr-12 text-right ${isEven ? 'md:opacity-100' : 'md:opacity-0 pointer-events-none'}`}>
                    <h4 className="font-serif text-2xl text-gold mb-2">{activity.title}</h4>
                    <p className="text-muted font-light mb-4">{activity.description}</p>
                    <span className="inline-block px-4 py-1 border border-gold/30 rounded-full text-xs text-champagne uppercase tracking-wider bg-gold/5">
                      {activity.stat}
                    </span>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-navy border-2 border-gold/60 text-gold shadow-[0_0_20px_rgba(212,175,98,0.4)] z-10 shrink-0 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-300">
                    <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-20"></div>
                    <span className="opacity-0 hidden">{activity.id}</span>
                    <div className="w-6 h-6">
                      {iconMap[activity.icon]}
                    </div>
                  </div>

                  {/* Right Side (Content for odd on Desktop, All on Mobile) */}
                  <div className={`pl-20 md:pl-12 w-full md:w-1/2 ${!isEven ? 'md:opacity-100 md:text-left' : 'md:hidden'} text-left`}>
                    <h4 className="font-serif text-2xl text-gold mb-2">{activity.title}</h4>
                    <p className="text-muted font-light mb-4">{activity.description}</p>
                    <span className="inline-block px-4 py-1 border border-gold/30 rounded-full text-xs text-champagne uppercase tracking-wider bg-gold/5">
                      {activity.stat}
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Timeline;
