import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const mosqueImages = [
  'img41.jpeg', 'img42.jpeg', 'img43.jpeg', 'img44.jpeg', 'img45.jpeg',
  'img46.jpeg', 'img47.jpeg', 'img48.jpeg', 'img49.jpeg', 'img50.jpeg'
];

const MosqueGallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="mosque-gallery" className="py-16 md:py-24 relative overflow-hidden bg-midnight">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-midnight to-midnight pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Sacred Spaces
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory font-bold mb-6"
          >
            Mosque Gallery
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light max-w-2xl mx-auto"
          >
            A closer look at the spiritual centers and sacred gatherings that form the heart of our community.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
          {mosqueImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden border border-gold/20 shadow-lg bg-navy/30"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={`/mosque/${img}`} 
                alt={`Mosque image ${index + 1}`} 
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-midnight/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-2 border border-gold text-gold font-semibold rounded-full text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-midnight/40 backdrop-blur-sm">
                  View Image
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-gold/20 text-white rounded-full transition-colors z-[101]"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={`/mosque/${selectedImg}`} 
              alt="Expanded view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(212,175,98,0.15)] border border-gold/30"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default MosqueGallery;
