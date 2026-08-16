import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteSection from './components/QuoteSection';
import About from './components/About';
import Mission from './components/Mission';
import Founders from './components/Founders';
import Timeline from './components/Timeline';
import ImpactStats from './components/ImpactStats';
import Humanitarian from './components/Humanitarian';
import Education from './components/Education';
import KarbalaSection from './components/KarbalaSection';
import Brotherhood from './components/Brotherhood';
import MosqueGuide from './components/MosqueGuide';
import FinalAppeal from './components/FinalAppeal';
import Footer from './components/Footer';
import StarField from './components/StarField';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSplash]);

  return (
    <div className="min-h-screen text-ivory selection:bg-gold/30 selection:text-gold relative overflow-x-hidden">
      <StarField />
      
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <Navbar />
      
      <main>
        <Hero />
        <QuoteSection />
        <About />
        <Mission />
        <Founders />
        <Timeline />
        <ImpactStats />
        <Humanitarian />
        <Gallery />
        <VideoSection />
        <Education />
        <KarbalaSection />
        <Brotherhood />
        <MosqueGuide />
        <FinalAppeal />
      </main>

      <Footer />
    </div>
  );
}

export default App;
