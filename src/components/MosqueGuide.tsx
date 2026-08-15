import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const mosqueData = [
  {
    district: "Chennai District",
    mosques: [
      { name: "Masjid-e-Abbasiya", location: "Thousand Lights", note: "250+ Years Old" },
      { name: "Masjid-e-Hussaini", location: "Royapettah" },
      { name: "Asthana-e-Qasim", location: "Triplicane", note: "180 Year Old Procession" },
      { name: "Masjid-e-Ali / Asthana-e-Moula Ali Dargah", location: "Pallavaram", note: "400+ Years Old" },
      { name: "Masjid-e-Hussaini", location: "Perambur" },
      { name: "Mehfil-E-Khuddamul Maassumeen (Aashurkhana)", location: "Parrys, Angappan Naicken Street" }
    ]
  },
  {
    district: "Vellore District",
    mosques: [
      { name: "Masjid-e-Abu Talib", location: "Vellore" }
    ]
  },
  {
    district: "Tirupattur District",
    mosques: [
      { name: "Masjid-e-Hussaini", location: "Thoraipadi" },
      { name: "Masjid-e-Ashnashari", location: "Vaniyambadi" }
    ]
  },
  {
    district: "Ranipet District",
    mosques: [
      { name: "Masjid-e-Asadullah", location: "Baqar Abad" }
    ]
  },
  {
    district: "Krishnagiri District",
    mosques: [
      { name: "Masjid-e-Akbar", location: "Jagadevi" }
    ]
  }
];

const MosqueGuide: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-gold font-semibold tracking-widest uppercase mb-4"
          >
            Spiritual Centers
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-ivory font-bold max-w-3xl mx-auto leading-tight"
          >
            Tamil Nadu Shia Mosques Guide
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light mt-4"
          >
            District Wise Directory
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {mosqueData.map((districtGroup, dIndex) => (
            <motion.div 
              key={dIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-navy/30 border border-gold/20 rounded-3xl overflow-hidden backdrop-blur-sm"
            >
              {/* District Header */}
              <div className="bg-gradient-to-r from-gold/10 to-transparent p-6 md:px-10 border-b border-gold/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold font-serif shadow-[0_0_15px_rgba(212,175,98,0.3)]">
                  {dIndex + 1}
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-gold">{districtGroup.district}</h4>
              </div>
              
              {/* Mosques List */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {districtGroup.mosques.map((mosque, mIndex) => (
                    <div key={mIndex} className="flex gap-4 group">
                      <div className="mt-1 flex-shrink-0 text-gold/50 group-hover:text-gold transition-colors">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h5 className="font-serif text-lg text-ivory group-hover:text-gold transition-colors">{mosque.name}</h5>
                        <p className="text-muted text-sm mt-1">{mosque.location}</p>
                        {mosque.note && (
                          <span className="inline-block mt-2 px-3 py-1 bg-gold/10 text-champagne text-xs rounded-full border border-gold/20 italic">
                            {mosque.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MosqueGuide;
