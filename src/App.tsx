import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Existing Public Website Components
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
import MosqueGallery from './components/MosqueGallery';
import VideoSection from './components/VideoSection';

// Providers
import { SiteDataProvider } from './context/SiteDataContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';

// Admin Components & Pages
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import ContentManagement from './admin/pages/ContentManagement';
import ImageManagement from './admin/pages/ImageManagement';
import StatisticsManagement from './admin/pages/StatisticsManagement';
import EventManagement from './admin/pages/EventManagement';
import TracksManagement from './admin/pages/TracksManagement';
import SponsorsManagement from './admin/pages/SponsorsManagement';
import AnnouncementsManagement from './admin/pages/AnnouncementsManagement';

// Public Landing Page Component (Preserves all existing UI, styling, and animations)
function PublicWebsite() {
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
        <MosqueGallery />
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

function App() {
  return (
    <SiteDataProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website Route */}
            <Route path="/" element={<PublicWebsite />} />

            {/* Admin Authentication Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Panel Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="images" element={<ImageManagement />} />
              <Route path="statistics" element={<StatisticsManagement />} />
              <Route path="events" element={<EventManagement />} />
              <Route path="tracks" element={<TracksManagement />} />
              <Route path="sponsors" element={<SponsorsManagement />} />
              <Route path="announcements" element={<AnnouncementsManagement />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </SiteDataProvider>
  );
}

export default App;
