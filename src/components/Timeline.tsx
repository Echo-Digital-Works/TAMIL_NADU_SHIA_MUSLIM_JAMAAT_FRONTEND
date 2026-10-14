import React from 'react';
import { motion } from 'framer-motion';
import { activities as defaultActivities } from '../data/jamaatData';
import { useSiteData } from '../context/SiteDataContext';
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
  const { activities: siteActivities } = useSiteData();
  const activities = (siteActivities && siteActivities.length > 0) ? siteActivities : defaultActivities;

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
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:hidden'} order-2 md:order-1`}>
                    {isEven && (
                      <div className="luxury-card p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300">
                        <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">{activity.stat}</span>
                        <h4 className="font-serif text-2xl text-ivory font-bold mb-3">{activity.title}</h4>
                        <p className="text-muted font-light text-sm md:text-base leading-relaxed">{activity.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Node / Icon */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-14 h-14 rounded-full bg-navy border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(212,175,98,0.2)] z-10 order-1 md:order-2">
                    {iconMap[activity.icon] || <Globe />}
                  </div>

                  {/* Right Side (Content for odd, Empty for even on Desktop) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-12 ${!isEven ? 'md:text-left' : 'md:hidden'} order-2 md:order-3`}>
                    <div className="luxury-card p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300">
                      <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">{activity.stat}</span>
                      <h4 className="font-serif text-2xl text-ivory font-bold mb-3">{activity.title}</h4>
                      <p className="text-muted font-light text-sm md:text-base leading-relaxed">{activity.description}</p>
                    </div>
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
