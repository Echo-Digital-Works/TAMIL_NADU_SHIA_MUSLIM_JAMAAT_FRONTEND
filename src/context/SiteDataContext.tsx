import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { statistics as defaultStats, activities as defaultActivities, quotes as defaultQuotes } from '../data/jamaatData';

export interface SiteBranding {
  logoUrl: string;
  name: string;
  shortName: string;
  tagline: string;
  instagramUrl: string;
  whatsappNumber: string;
  primaryPhone: string;
  email: string;
  address: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  about: {
    badge: string;
    title: string;
    leadText: string;
    quote: string;
    milestoneNumber: string;
    milestoneUnit: string;
    milestoneLabel: string;
    stats: Array<{ value: string; label: string }>;
  };
  quotes: {
    bismillahArabic: string;
    bismillahTranslation: string;
    quran: { text: string; source: string };
    imamAli: { text: string; source: string };
    prophet: { text: string; source: string };
  };
  humanitarian: {
    badge: string;
    title: string;
    description: string;
    contributionLabel: string;
    contributionValue: string;
    image: string;
    quote: string;
  };
  education: {
    badge: string;
    title: string;
    description: string;
    cards: Array<{ value: string; title: string; desc: string; icon: string }>;
  };
  karbala: {
    badge: string;
    title: string;
    cards: Array<{ title: string; desc: string }>;
  };
  brotherhood: {
    pillars: string[];
    quote: { text: string; source: string };
  };
  finalAppeal: {
    title: string;
    description: string;
    phoneNumbers: string[];
    whatsappNumber: string;
    quote: { text: string; source: string };
  };
  footer: {
    aboutText: string;
    copyrightText: string;
  };
}

export interface ObjectiveItem {
  id: number | string;
  title: string;
  desc: string;
}

export interface FounderItem {
  id: number | string;
  name: string;
  role: string;
  image: string;
}

export interface MosqueDistrict {
  district: string;
  mosques: Array<{ name: string; location: string; note?: string }>;
}

export interface VideoItem {
  id: number | string;
  src: string;
  thumbnail: string;
  title: string;
}

export interface SiteImages {
  heroDesktop: string[];
  heroMobile: string[];
  gallery: string[];
  mosqueGallery: string[];
}

export interface StatisticItem {
  id?: string;
  value: string;
  label: string;
  suffix: string;
}

export interface ActivityItem {
  id: number | string;
  title: string;
  description: string;
  stat: string;
  icon: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  status: string;
  badge?: string;
}

export interface TrackItem {
  id: string;
  name: string;
  problemStatement: string;
  initiatives: string;
  category: string;
  leadCoordinator: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  type: string;
  description: string;
  logoUrl: string;
  website: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: string;
  active: boolean;
}

interface SiteDataContextType {
  branding: SiteBranding;
  content: SiteContent;
  objectives: ObjectiveItem[];
  founders: FounderItem[];
  mosqueGuide: MosqueDistrict[];
  videos: VideoItem[];
  images: SiteImages;
  statistics: StatisticItem[];
  activities: ActivityItem[];
  events: EventItem[];
  tracks: TrackItem[];
  sponsors: SponsorItem[];
  announcements: AnnouncementItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  getImageUrl: (path: string) => string;
}

const defaultBranding: SiteBranding = {
  logoUrl: '/logo.jpeg',
  name: 'Tamil Nadu Shia Muslim Jamaat',
  shortName: 'TNSMJ',
  tagline: 'Faith • Unity • Justice • Humanity',
  instagramUrl: 'https://www.instagram.com/tamil_nadu_shia_muslim_jamaath?igsh=MTBmYnl0NGVvNDhybA==',
  whatsappNumber: '+919566016668',
  primaryPhone: '+919566016668',
  email: 'info@tnshiamuslimjamaat.org',
  address: 'Chennai, Tamil Nadu, India'
};

const defaultContent: SiteContent = {
  hero: {
    title: 'Tamil Nadu Shia Muslim Jamaat',
    subtitle: '1st Year Completion Report',
    tagline: 'Serving with Faith • Unity • Justice • Humanity',
    description: 'Dedicated to the welfare, unity, educational advancement, and spiritual elevation of the Shia Muslim community across Tamil Nadu.',
    primaryButtonText: 'Explore Our Journey',
    primaryButtonLink: '#journey',
    secondaryButtonText: 'View Annual Report',
    secondaryButtonLink: '#impact'
  },
  about: {
    badge: '1st Year Completion',
    title: 'A Journey of Faith and Dedication',
    leadText: "\"By the immense grace of Allah Subhanahu wa Ta'ala, and with the prayers of Ahlul Bayt Alayhimussalam, we are honored and grateful to announce that the Tamil Nadu Shia Muslim Jamaat has successfully completed its first year.\"",
    quote: 'Our dedication stems from the eternal teachings of the Holy Prophet (PBUH) and the Ahlulbayt (AS), striving for community welfare, educational upliftment, and mutual brotherhood.',
    milestoneNumber: '1',
    milestoneUnit: 'Year',
    milestoneLabel: 'Milestone',
    stats: [
      { value: '200+', label: 'Students Supported' },
      { value: '2,000+', label: 'People Served' },
      { value: '10+', label: 'Mosques Reached' },
      { value: '₹5L', label: 'Humanitarian Aid' }
    ]
  },
  quotes: {
    bismillahArabic: 'بسم الله الرحمن الرحيم',
    bismillahTranslation: 'In the Name of Allah, The Most Gracious, The Most Merciful',
    quran: defaultQuotes.quran,
    imamAli: defaultQuotes.imamAli,
    prophet: defaultQuotes.prophet,
  },
  humanitarian: {
    badge: 'Service Beyond Boundaries',
    title: 'A commitment to humanity in times of need.',
    description: 'True faith is demonstrated through compassionate action. When tragedy struck the Meena School in Iran resulting in the tragic loss of 167 children, the Jamaat stepped forward to aid in the reconstruction efforts.',
    contributionLabel: 'Total Contribution',
    contributionValue: '₹5,00,000',
    image: '/picture1.jpeg',
    quote: '"As long as a person helps his brother, Allah will continue to help him."'
  },
  education: {
    badge: 'Empowering the Future',
    title: 'Educational Support & Encouragement',
    description: 'We believe that education is the foundation of a strong and just society. During our first year, we prioritized supporting students in their academic journeys.',
    cards: [
      {
        value: '200',
        title: 'Students Supported',
        desc: 'Provided essential school bags and notebooks to ensure students have the tools they need to succeed.',
        icon: 'book-open'
      },
      {
        value: '150',
        title: 'Academic Achievers',
        desc: 'Awarded special prizes and ₹2,000 incentives each to students passing 10th and 12th grades with high marks.',
        icon: 'award'
      }
    ]
  },
  karbala: {
    badge: 'A Legacy of Sacrifice',
    title: 'Karbala',
    cards: [
      {
        title: 'Muharram Campaign',
        desc: 'Digital banners displayed across central locations in Chennai commemorating the timeless sacrifice of Karbala and Imam Hussain (AS).'
      },
      {
        title: 'Awareness Literature',
        desc: '5,000 copies of the profound booklet "Karbala — A History of Sacrifice" were successfully distributed across more than 10 mosques.'
      },
      {
        title: '10-Day Sabeel',
        desc: 'Honoring the thirst of the martyrs, juice, buttermilk, and cold water were continuously distributed to the public on Peters Road during the first 10 days of Muharram.'
      }
    ]
  },
  brotherhood: {
    pillars: ['Faith', 'Justice', 'Brotherhood', 'Service'],
    quote: {
      text: 'People are of two types: either your brother in faith, or your equal in humanity.',
      source: 'Imam Ali (AS)'
    }
  },
  finalAppeal: {
    title: 'Together in Faith.\nTogether in Service.',
    description: 'We seek your continued support, prayers, and contributions to undertake many more services. We cordially invite everyone to join hands with the Jamaat and serve together.',
    phoneNumbers: ['+91 95660 16668', '+91 94449 24746', '+91 95001 07634'],
    whatsappNumber: '+919566016668',
    quote: defaultQuotes.prophet
  },
  footer: {
    aboutText: 'Dedicated to serving the community through humanitarian aid, educational support, and upholding justice and brotherhood.',
    copyrightText: '© 2026 Tamil Nadu Shia Muslim Jamaat. All rights reserved.'
  }
};

const defaultImages: SiteImages = {
  heroDesktop: ['/hero/hero-1.png', '/hero/hero-2.png'],
  heroMobile: ['/hero/hero-1-mobile.png', '/hero/hero-2-mobile.png'],
  gallery: Array.from({ length: 40 }, (_, i) => `/images/img${i + 1}.jpeg`),
  mosqueGallery: [
    '/images/img41.jpeg', '/images/img42.jpeg', '/images/img43.jpeg', '/images/img44.jpeg', '/images/img45.jpeg',
    '/images/img46.jpeg', '/images/img47.jpeg', '/images/img48.jpeg', '/images/img49.jpeg', '/images/img50.jpeg'
  ]
};

const defaultFounders: FounderItem[] = [
  { id: 1, name: 'M. Mohammed Akil', role: 'President', image: '/founder/founder-1.jpeg?v=2' },
  { id: 2, name: 'Hyder', role: 'Secretary', image: '/founder/founder-2.jpeg?v=2' },
  { id: 3, name: 'Syed Hasan Mohammed', role: 'Treasurer', image: '/founder/founder-3.jpeg?v=2' }
];

const defaultObjectives: ObjectiveItem[] = [
  { id: 1, title: 'Unity', desc: 'To unite all Muslims without any division, fostering a resilient and inseparable brotherhood across all communities.' },
  { id: 2, title: 'Religious Harmony', desc: 'To maintain and promote religious harmony in society, building bridges of understanding and mutual respect.' },
  { id: 3, title: 'Respect for Law', desc: 'To respect and abide by the laws of the Central and State Governments, serving as exemplary and responsible citizens.' },
  { id: 4, title: 'Propagation of Tawheed', desc: 'To spread the message of Monotheism among the people, illuminating hearts with the divine truth of the Almighty.' },
  { id: 5, title: 'Glorifying Ahlul Bayt', desc: "To propagate the virtues and greatness of the Prophet's family, ensuring their noble legacy guides future generations." },
  { id: 6, title: 'Wilayat of Ali', desc: 'To convey the Wilayat of Imam Ali (AS), illuminating the path of spiritual leadership and divine guidance.' },
  { id: 7, title: 'Message of Karbala', desc: 'To implement the objectives and sacrifices of Karbala, standing firmly for justice and truth in every era.' },
  { id: 8, title: 'Educational Assistance', desc: 'To provide educational support to poor and underprivileged students, empowering them to build a brighter future.' },
  { id: 9, title: 'Social Service', desc: 'To support poor mothers and senior citizens, ensuring they receive the dignity, care, and compassion they deserve.' },
  { id: 10, title: 'Medical Service', desc: 'To conduct free medical camps, bringing essential healthcare and relief to the most vulnerable members of society.' },
  { id: 11, title: 'Cleanliness Drive', desc: 'To engage in cleanliness activities in schools, colleges, libraries, and hospitals, promoting a pure and healthy environment.' },
  { id: 12, title: 'Legal Protection', desc: "To provide clarification against those who spread defamation about Shias, and to address them legally if necessary to protect our community's honor." }
];

const defaultMosqueGuide: MosqueDistrict[] = [
  {
    district: 'Chennai District',
    mosques: [
      { name: 'Masjid-e-Abbasiya', location: 'Thousand Lights', note: '250+ Years Old' },
      { name: 'Masjid-e-Hussaini', location: 'Royapettah', note: '' },
      { name: 'Asthana-e-Qasim', location: 'Triplicane', note: '180 Year Old Procession' },
      { name: 'Masjid-e-Ali / Asthana-e-Moula Ali Dargah', location: 'Pallavaram', note: '400+ Years Old' },
      { name: 'Masjid-e-Hussaini', location: 'Perambur', note: '' },
      { name: 'Mehfil-E-Khuddamul Maassumeen (Aashurkhana)', location: 'Parrys, Angappan Naicken Street', note: '' }
    ]
  },
  {
    district: 'Vellore District',
    mosques: [{ name: 'Masjid-e-Abu Talib', location: 'Vellore', note: '' }]
  },
  {
    district: 'Tirupattur District',
    mosques: [
      { name: 'Masjid-e-Hussaini', location: 'Thoraipadi', note: '' },
      { name: 'Masjid-e-Ashnashari', location: 'Vaniyambadi', note: '' }
    ]
  },
  {
    district: 'Ranipet District',
    mosques: [{ name: 'Masjid-e-Asadullah', location: 'Baqar Abad', note: '' }]
  },
  {
    district: 'Krishnagiri District',
    mosques: [{ name: 'Masjid-e-Akbar', location: 'Jagadevi', note: '' }]
  }
];

const defaultVideos: VideoItem[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/videos/vid${i + 1}.mp4`,
  thumbnail: `/images/img${i + 1}.jpeg`,
  title: `Community Video ${i + 1}`
}));

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const SERVER_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<SiteBranding>(defaultBranding);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [objectives, setObjectives] = useState<ObjectiveItem[]>(defaultObjectives);
  const [founders, setFounders] = useState<FounderItem[]>(defaultFounders);
  const [mosqueGuide, setMosqueGuide] = useState<MosqueDistrict[]>(defaultMosqueGuide);
  const [videos, setVideos] = useState<VideoItem[]>(defaultVideos);
  const [images, setImages] = useState<SiteImages>(defaultImages);
  const [statistics, setStatistics] = useState<StatisticItem[]>(defaultStats);
  const [activities, setActivities] = useState<ActivityItem[]>(defaultActivities);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/uploads')) return `${SERVER_BASE}${path}`;
    return path;
  };

  const refreshData = useCallback(async () => {
    try {
      const [
        resBranding,
        resContent,
        resObjectives,
        resFounders,
        resMosques,
        resVideos,
        resImages,
        resStats,
        resActivities,
        resEvents,
        resTracks,
        resSponsors,
        resAnnouncements,
      ] = await Promise.allSettled([
        fetch(`${API_BASE}/branding`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/content`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/objectives`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/founders`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/mosque-guide`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/videos`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/images`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/statistics`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/activities`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/events`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/tracks`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/sponsors`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/announcements`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null),
      ]);

      if (resBranding.status === 'fulfilled' && resBranding.value?.data) {
        setBranding(resBranding.value.data);
      }
      if (resContent.status === 'fulfilled' && resContent.value?.data) {
        setContent(resContent.value.data);
      }
      if (resObjectives.status === 'fulfilled' && Array.isArray(resObjectives.value?.data)) {
        setObjectives(resObjectives.value.data);
      }
      if (resFounders.status === 'fulfilled' && Array.isArray(resFounders.value?.data)) {
        setFounders(resFounders.value.data);
      }
      if (resMosques.status === 'fulfilled' && Array.isArray(resMosques.value?.data)) {
        setMosqueGuide(resMosques.value.data);
      }
      if (resVideos.status === 'fulfilled' && Array.isArray(resVideos.value?.data)) {
        setVideos(resVideos.value.data);
      }
      if (resImages.status === 'fulfilled' && resImages.value?.data) {
        setImages(resImages.value.data);
      }
      if (resStats.status === 'fulfilled' && Array.isArray(resStats.value?.data)) {
        setStatistics(resStats.value.data);
      }
      if (resActivities.status === 'fulfilled' && Array.isArray(resActivities.value?.data)) {
        setActivities(resActivities.value.data);
      }
      if (resEvents.status === 'fulfilled' && Array.isArray(resEvents.value?.data)) {
        setEvents(resEvents.value.data);
      }
      if (resTracks.status === 'fulfilled' && Array.isArray(resTracks.value?.data)) {
        setTracks(resTracks.value.data);
      }
      if (resSponsors.status === 'fulfilled' && Array.isArray(resSponsors.value?.data)) {
        setSponsors(resSponsors.value.data);
      }
      if (resAnnouncements.status === 'fulfilled' && Array.isArray(resAnnouncements.value?.data)) {
        setAnnouncements(resAnnouncements.value.data);
      }
    } catch (err) {
      console.warn('Backend API connection warning, using local static data fallback:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();

    // Cross-tab real-time sync via BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('jamaat_site_sync');
        channel.onmessage = () => {
          refreshData();
        };
      }
    } catch {
      // Ignore if unsupported
    }

    // Fallback: cross-window storage event listener
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'jamaat_last_update') {
        refreshData();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, [refreshData]);

  return (
    <SiteDataContext.Provider
      value={{
        branding,
        content,
        objectives,
        founders,
        mosqueGuide,
        videos,
        images,
        statistics,
        activities,
        events,
        tracks,
        sponsors,
        announcements,
        loading,
        refreshData,
        getImageUrl,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

export default SiteDataContext;
