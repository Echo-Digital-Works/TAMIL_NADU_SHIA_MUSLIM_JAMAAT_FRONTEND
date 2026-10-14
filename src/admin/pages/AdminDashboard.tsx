import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Image as ImageIcon,
  BarChart3,
  Layers,
  Activity,
  ArrowRight,
  Database,
  Cpu,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Building2,
  Users,
  Compass,
  Heart,
  BookOpen,
  Quote,
  Phone,
  Flag,
  Film,
  Building
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import adminApi from '../services/adminApi';

export const AdminDashboard: React.FC = () => {
  const { user } = useAdminAuth();
  const [statsCount, setStatsCount] = useState(0);
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const [statsRes, healthRes] = await Promise.allSettled([
          adminApi.getStatistics(),
          fetch('http://localhost:5000/api/v1/health/details', { cache: 'no-store' }).then((r) => r.json()),
        ]);

        if (statsRes.status === 'fulfilled') setStatsCount(statsRes.value.data?.length || 0);
        if (healthRes.status === 'fulfilled') setHealthData(healthRes.value);
      } catch (err) {
        console.error('Error fetching dashboard overview:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={36} />
        <p className="text-sm text-ivory/60">Loading system overview...</p>
      </div>
    );
  }

  // Section-by-section direct editing shortcuts in exact homepage top-to-bottom order
  const sectionEditors = [
    { order: '01', title: 'Navbar & Brand Identity', desc: 'Jamaat emblem logo upload, name, primary phone, WhatsApp & Instagram', path: '/admin/content?tab=branding', icon: ShieldCheck, tag: '01 • Top Header' },
    { order: '02', title: 'Hero Landing Banner', desc: 'Main heading, completion report tag, description & action buttons', path: '/admin/content?tab=hero', icon: Sparkles, tag: '02 • Section 1' },
    { order: '03', title: 'Sacred Quran Verse & Bismillah', desc: 'Arabic Bismillah calligraphy, English translation, Quran ayah & Surah source', path: '/admin/content?tab=quotes', icon: Quote, tag: '03 • Section 2' },
    { order: '04', title: 'About & 1-Year Milestone', desc: '1st Year badge, title, lead story, milestone visual box & 4 highlight stats', path: '/admin/content?tab=about', icon: Building2, tag: '04 • Section 3' },
    { order: '05', title: 'Aim & Guidance Objectives (12)', desc: '12 Charters: Unity, Harmony, Law, Tawheed, Wilayat, Legal Protection', path: '/admin/content?tab=objectives', icon: Layers, tag: '05 • Section 4' },
    { order: '06', title: 'Office Bearers & Founders (3)', desc: 'President M. Mohammed Akil, Secretary Hyder, Treasurer Syed Hasan Mohammed', path: '/admin/content?tab=founders', icon: Users, tag: '06 • Section 5' },
    { order: '07', title: 'Timeline Activities (12)', desc: 'SIR voting camps, Meena relief, Mawlood biryani, student kits, Sabeel', path: '/admin/content?tab=activities', icon: Compass, tag: '07 • Section 6' },
    { order: '08', title: 'Humanitarian Aid', desc: 'Contribution amount (₹5,00,000), Iran school story, featured photo & quote', path: '/admin/content?tab=humanitarian', icon: Heart, tag: '08 • Section 7' },
    { order: '09', title: 'Educational Support', desc: '200 Students bag kits card, 150 Academic Achievers ₹2,000 awards card', path: '/admin/content?tab=education', icon: BookOpen, tag: '09 • Section 8' },
    { order: '10', title: 'Karbala & Muharram Tribute', desc: 'Muharram campaign, 5,000 history booklets & 10-day Sabeel service cards', path: '/admin/content?tab=karbala', icon: Flag, tag: '10 • Section 9' },
    { order: '11', title: 'Brotherhood & 4 Pillars', desc: '4 Core Pillars (Faith, Justice, Brotherhood, Service) & Imam Ali quote', path: '/admin/content?tab=brotherhood', icon: Users, tag: '11 • Section 10' },
    { order: '12', title: 'Statewide Mosque Guide (5 Districts)', desc: 'Chennai (6 mosques), Vellore, Tirupattur, Ranipet, Krishnagiri directory', path: '/admin/content?tab=mosqueGuide', icon: Building, tag: '12 • Section 11' },
    { order: '13', title: 'Final Appeal & Contact Hotlines', desc: 'Together in Faith appeal, 3 helpline numbers, Prophet hadith & WhatsApp form', path: '/admin/content?tab=finalAppeal', icon: Phone, tag: '13 • Section 12' },
    { order: '14', title: 'Footer & Copyright Notice', desc: 'Wassalam closing, mission summary statement & official copyright notice', path: '/admin/content?tab=footer', icon: ShieldCheck, tag: '14 • Footer' },
    { order: '—', title: 'Hero Slideshow Images', desc: 'Desktop (16:9) & mobile (9:16) background slideshow upload & delete', path: '/admin/images', icon: ImageIcon, tag: 'Media Manager' },
    { order: '—', title: 'Social Work Gallery (40 Photos)', desc: 'All 40 community welfare photographs: upload replacement & titles', path: '/admin/images', icon: ImageIcon, tag: 'Media Manager' },
    { order: '—', title: 'Sacred Mosque Gallery (10 Photos)', desc: '10 historic mosque portraits: replace photos & update locations', path: '/admin/images', icon: Building, tag: 'Media Manager' },
    { order: '—', title: 'Documentary Videos (9 Streams)', desc: '9 interactive documentary video links & custom poster thumbnails', path: '/admin/images', icon: Film, tag: 'Media Manager' },
    { order: '—', title: 'Live Counter Statistics (8 Metrics)', desc: '₹5L aid, 2,000 served, 1,000 meals, 200 students live impact counters', path: '/admin/statistics', icon: BarChart3, tag: 'Live Metrics' },
  ];

  const secondaryModules = [
    { title: 'All Website Content', desc: 'Full tabbed master editor for all textual sections, charter points & quotes', path: '/admin/content', icon: FileText, color: 'from-amber-500/20 to-amber-500/5' },
    { title: 'Image & Media Manager', desc: 'Hero slideshows, 40 welfare photos, 10 mosque portraits & video streams', path: '/admin/images', icon: ImageIcon, color: 'from-blue-500/20 to-blue-500/5' },
    { title: 'Participant & Impact Stats', desc: 'Live counters shown on the public metrics section', path: '/admin/statistics', icon: BarChart3, count: statsCount, color: 'from-emerald-500/20 to-emerald-500/5' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#121622] via-midnight to-[#121622] border border-gold/20 p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <CheckCircle2 size={13} />
              <span>100% Admin Control Enabled</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-wide">
              Welcome back, {user?.displayName || user?.username}
            </h1>
            <p className="text-sm text-ivory/70 mt-2 max-w-2xl leading-relaxed">
              Every single line of text, heading, quote, metric, founder photo, and gallery image is completely under your control. Choose any section below to make live edits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View Public Website</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Backend & Database Health Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Database size={24} />
          </div>
          <div>
            <p className="text-xs text-ivory/50 uppercase tracking-wider font-semibold">Backend Database</p>
            <h3 className="text-lg font-bold text-emerald-400 mt-0.5">Connected (Port 5000)</h3>
            <p className="text-xs text-ivory/60 mt-0.5">Atomic JSON Storage Active</p>
          </div>
        </div>

        <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold border border-gold/20 flex items-center justify-center shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-ivory/50 uppercase tracking-wider font-semibold">Live Server</p>
            <h3 className="text-lg font-bold text-ivory mt-0.5">{healthData?.uptime || 'Operational'}</h3>
            <p className="text-xs text-ivory/60 mt-0.5">Real-time Synchronization</p>
          </div>
        </div>

        <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Cpu size={24} />
          </div>
          <div>
            <p className="text-xs text-ivory/50 uppercase tracking-wider font-semibold">System Memory</p>
            <h3 className="text-lg font-bold text-ivory mt-0.5">
              {healthData?.system?.memoryUsageMB?.heapUsed ? `${healthData.system.memoryUsageMB.heapUsed} MB Used` : 'Normal'}
            </h3>
            <p className="text-xs text-ivory/60 mt-0.5">Node {healthData?.system?.nodeVersion || 'v24'}</p>
          </div>
        </div>
      </div>

      {/* DIRECT WEBSITE SECTION EDITORS */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-serif text-xl font-bold text-ivory flex items-center gap-2">
              <span>Direct Website Section Editors</span>
              <span className="text-xs font-sans font-normal text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                {sectionEditors.length} Sections
              </span>
            </h2>
            <p className="text-xs text-ivory/60 mt-1">
              Click any section below to directly open its editor and change its text, numbers, or images.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionEditors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                to={sec.path}
                className="group relative bg-[#0E121B] hover:bg-[#131926] border border-white/10 hover:border-gold/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-gold/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-gold border border-gold/20">
                      {sec.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-ivory group-hover:text-gold transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-ivory/60 mt-1 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gold group-hover:translate-x-1 transition-transform">
                  <span>Edit This Section</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CORE MODULES */}
      <div>
        <h2 className="font-serif text-xl font-bold text-ivory mb-5 flex items-center gap-2">
          <span>Master Management Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryModules.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group relative bg-[#0E121B] hover:bg-[#131926] border border-white/10 hover:border-gold/40 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-gold/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} border border-white/10 flex items-center justify-center text-ivory group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className="text-gold" />
                    </div>
                    {item.count !== undefined && (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 text-ivory/70 border border-white/10">
                        {item.count} items
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ivory/60 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gold group-hover:translate-x-1 transition-transform">
                  <span>Open Module</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
