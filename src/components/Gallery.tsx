import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  "WhatsApp Image 2026-08-14 at 11.32.29 AM (1).jpeg",
  "WhatsApp Image 2026-08-14 at 11.32.29 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.32.30 AM (1).jpeg",
  "WhatsApp Image 2026-08-14 at 11.32.30 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.32.31 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.32.32 AM (1).jpeg",
  "WhatsApp Image 2026-08-14 at 11.32.32 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.34.46 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.34.47 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.34.48 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.34.49 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.34.52 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.25 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.38 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.44 AM (1).jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.44 AM (2).jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.44 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.45 AM (1).jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.45 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.46 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.47 AM (1).jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.47 AM (2).jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.47 AM.jpeg",
  "WhatsApp Image 2026-08-14 at 11.40.48 AM (1).jpeg",
  "../photo/WhatsApp Image 2026-08-14 at 4.57.22 PM.jpeg",
  "../photo/WhatsApp Image 2026-08-14 at 4.57.23 PM (1).jpeg",
  "../photo/WhatsApp Image 2026-08-14 at 4.57.23 PM.jpeg"
];

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Social Work & Impact
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory font-bold mb-6"
          >
            Our Work in Action
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light max-w-2xl mx-auto"
          >
            A visual journey of our humanitarian efforts, community support, and social welfare programs across the region.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: (index % 5) * 0.1, duration: 0.5 }}
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden border border-gold/10 shadow-lg bg-navy/30"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={`/images/${img}`} 
                alt={`Social Work ${index + 1}`} 
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-4 py-2 bg-gold/90 text-midnight font-semibold rounded-full text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  View Photo
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
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-gold/20 text-white rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={`/images/${selectedImg}`} 
              alt="Expanded view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(212,175,98,0.1)] border border-gold/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
