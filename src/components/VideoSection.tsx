import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

// Generates 9 videos: vid1.mp4 to vid9.mp4
// Uses the newly uploaded gallery images as unique thumbnails
const videos = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/videos/vid${i + 1}.mp4`,
  thumbnail: `/images/img${i + 1}.jpeg`, 
  title: `Community Video ${i + 1}`
}));

const VideoSection: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-midnight">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Video Highlights
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory font-bold mb-6"
          >
            Watch Our Journey
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light max-w-2xl mx-auto"
          >
            Experience the impact of our community programs and humanitarian efforts through our documentary series.
          </motion.p>
        </div>

        {/* 3x3 Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-gold/10 aspect-video bg-navy/30 flex items-center justify-center"
              onClick={() => setPlayingVideo(video.src)}
            >
              {/* Thumbnail / Cover */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
              
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Play Button */}
              <div className="relative z-20 w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center text-midnight shadow-[0_0_20px_rgba(212,175,98,0.4)] transform group-hover:scale-110 transition-transform duration-300">
                <Play size={28} className="ml-1" fill="currentColor" />
              </div>
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20">
                <p className="text-ivory font-medium text-sm drop-shadow-md">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setPlayingVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-gold/20 text-white rounded-full transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setPlayingVideo(null); }}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(212,175,98,0.2)] bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={playingVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                <p className="text-white text-center mt-10">Please upload your video to {playingVideo}.</p>
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;
