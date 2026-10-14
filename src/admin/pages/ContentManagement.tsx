import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Building2,
  Layers,
  Users,
  Compass,
  Heart,
  BookOpen,
  Quote,
  Phone,
  Flag,
} from 'lucide-react';
import adminApi from '../services/adminApi';
import ImageUploader from '../components/ImageUploader';
import { useSiteData } from '../../context/SiteDataContext';

type TabKey =
  | 'branding'
  | 'hero'
  | 'quotes'
  | 'about'
  | 'objectives'
  | 'founders'
  | 'activities'
  | 'humanitarian'
  | 'education'
  | 'karbala'
  | 'brotherhood'
  | 'mosqueGuide'
  | 'finalAppeal'
  | 'footer';

interface TabDefinition {
  id: TabKey;
  order: string;
  label: string;
  fullTitle: string;
  pageLocation: string;
  icon: any;
  summary: string;
}

export const ContentManagement: React.FC = () => {
  const { refreshData } = useSiteData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabKey) || 'branding';

  // State slices
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get('tab') as TabKey;
    if (param && param !== activeTab) {
      setActiveTab(param);
    }
  }, [searchParams]);

  const switchTab = (tab: TabKey) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Entities
  const [branding, setBranding] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [founders, setFounders] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [mosqueGuide, setMosqueGuide] = useState<any[]>([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const [bRes, cRes, oRes, fRes, aRes, mRes] = await Promise.all([
        adminApi.getBranding(),
        adminApi.getContent(),
        adminApi.getObjectives(),
        adminApi.getFounders(),
        adminApi.getActivities(),
        adminApi.getMosqueGuide(),
      ]);

      if (bRes?.data) setBranding(bRes.data);
      if (cRes?.data) setContent(cRes.data);
      if (Array.isArray(oRes?.data)) setObjectives(oRes.data);
      if (Array.isArray(fRes?.data)) setFounders(fRes.data);
      if (Array.isArray(aRes?.data)) setActivities(aRes.data);
      if (Array.isArray(mRes?.data)) setMosqueGuide(mRes.data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load content from database');
    } finally {
      setLoading(false);
    }
  };

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 5000);

    // Cross-tab broadcast so public site updates live without manual page reload
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const ch = new BroadcastChannel('jamaat_site_sync');
        ch.postMessage({ type: 'SYNC', ts: Date.now() });
        ch.close();
      }
    } catch {}
    localStorage.setItem('jamaat_last_update', Date.now().toString());
  };

  const handleSaveActiveTab = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (activeTab === 'branding') {
        const res = await adminApi.updateBranding(branding);
        setBranding(res.data);
        notifySuccess('Brand & Identity saved successfully!');
      } else if (activeTab === 'objectives') {
        const res = await adminApi.updateObjectives(objectives);
        setObjectives(res.data);
        notifySuccess('Mission Objectives saved successfully!');
      } else if (activeTab === 'founders') {
        const res = await adminApi.updateFounders(founders);
        setFounders(res.data);
        notifySuccess('Office Bearers & Founders saved successfully!');
      } else if (activeTab === 'activities') {
        const res = await adminApi.updateActivities(activities);
        setActivities(res.data);
        notifySuccess('Journey Activities saved successfully!');
      } else if (activeTab === 'mosqueGuide') {
        const res = await adminApi.updateMosqueGuide(mosqueGuide);
        setMosqueGuide(res.data);
        notifySuccess('Mosque Directory Guide saved successfully!');
      } else {
        // All content sections: hero, about, humanitarian, education, karbala, brotherhood, quotes, finalAppeal
        const res = await adminApi.updateContent(content);
        setContent(res.data);
        notifySuccess(`${activeTab.toUpperCase()} section saved successfully!`);
      }

      await refreshData();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await Promise.all([
        branding ? adminApi.updateBranding(branding) : Promise.resolve(),
        content ? adminApi.updateContent(content) : Promise.resolve(),
        objectives ? adminApi.updateObjectives(objectives) : Promise.resolve(),
        founders ? adminApi.updateFounders(founders) : Promise.resolve(),
        activities ? adminApi.updateActivities(activities) : Promise.resolve(),
        mosqueGuide ? adminApi.updateMosqueGuide(mosqueGuide) : Promise.resolve(),
      ]);

      notifySuccess('All website sections and textual content saved successfully!');
      await refreshData();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save all changes');
    } finally {
      setSaving(false);
    }
  };

  // Objectives helpers
  const addObjective = () => {
    const nextId = objectives.length > 0 ? Math.max(...objectives.map((o) => Number(o.id) || 0)) + 1 : 1;
    setObjectives([
      ...objectives,
      {
        id: nextId,
        title: 'New Jamaat Objective',
        desc: 'Description of the community initiative and sacred commitment.',
      },
    ]);
  };

  const updateObjective = (index: number, field: string, val: any) => {
    const copy = [...objectives];
    copy[index] = { ...copy[index], [field]: val };
    setObjectives(copy);
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  // Founders helpers
  const addFounder = () => {
    const nextId = founders.length > 0 ? Math.max(...founders.map((f) => Number(f.id) || 0)) + 1 : 1;
    setFounders([
      ...founders,
      {
        id: nextId,
        name: 'New Leader Name',
        role: 'Committee Member',
        image: '/founder/founder-1.jpeg',
      },
    ]);
  };

  const updateFounder = (index: number, field: string, val: any) => {
    const copy = [...founders];
    copy[index] = { ...copy[index], [field]: val };
    setFounders(copy);
  };

  const removeFounder = (index: number) => {
    setFounders(founders.filter((_, i) => i !== index));
  };

  // Activities helpers
  const addActivity = () => {
    const nextId = activities.length > 0 ? Math.max(...activities.map((a) => Number(a.id) || 0)) + 1 : 1;
    setActivities([
      ...activities,
      {
        id: nextId,
        title: 'New Timeline Milestone',
        description: 'Detailed description of the service organized for the community.',
        stat: '100 Beneficiaries',
        icon: 'users',
      },
    ]);
  };

  const updateActivity = (index: number, field: string, val: any) => {
    const copy = [...activities];
    copy[index] = { ...copy[index], [field]: val };
    setActivities(copy);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  // Mosque Guide helpers
  const addDistrict = () => {
    setMosqueGuide([
      ...mosqueGuide,
      {
        district: 'New District',
        mosques: [{ name: 'Masjid Name', location: 'City/Area', note: '' }],
      },
    ]);
  };

  const updateDistrictName = (dIndex: number, name: string) => {
    const copy = [...mosqueGuide];
    copy[dIndex].district = name;
    setMosqueGuide(copy);
  };

  const removeDistrict = (dIndex: number) => {
    setMosqueGuide(mosqueGuide.filter((_, i) => i !== dIndex));
  };

  const addMosqueToDistrict = (dIndex: number) => {
    const copy = [...mosqueGuide];
    copy[dIndex].mosques = [
      ...(copy[dIndex].mosques || []),
      { name: 'Masjid Name', location: 'Area', note: '' },
    ];
    setMosqueGuide(copy);
  };

  const updateMosqueField = (dIndex: number, mIndex: number, field: string, val: string) => {
    const copy = [...mosqueGuide];
    copy[dIndex].mosques[mIndex] = {
      ...copy[dIndex].mosques[mIndex],
      [field]: val,
    };
    setMosqueGuide(copy);
  };

  const removeMosqueFromDistrict = (dIndex: number, mIndex: number) => {
    const copy = [...mosqueGuide];
    copy[dIndex].mosques = copy[dIndex].mosques.filter((_: any, i: number) => i !== mIndex);
    setMosqueGuide(copy);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Fetching website content from backend database...</p>
      </div>
    );
  }

  const tabs: TabDefinition[] = [
    { id: 'branding', order: '01', label: 'Navbar & Brand', fullTitle: 'Brand Identity, Logo & Navigation', pageLocation: 'Top Header / Navbar', icon: ShieldCheck, summary: 'Emblem logo upload, organization title, primary phone, WhatsApp and Instagram profile' },
    { id: 'hero', order: '02', label: 'Hero Banner', fullTitle: 'Hero Section Banner & Titles', pageLocation: 'Section 01 on Homepage', icon: Sparkles, summary: 'Main serif heading, 1st Year Completion subtitle, mission tagline & primary buttons' },
    { id: 'quotes', order: '03', label: 'Quran Verse', fullTitle: 'Holy Bismillah & Sacred Quranic Verse', pageLocation: 'Section 02 on Homepage', icon: Quote, summary: 'Arabic Bismillah calligraphy, English translation, and Surah Al-Ma\'idah 5:2 verse citation' },
    { id: 'about', order: '04', label: 'About & Milestone', fullTitle: 'About Jamaat & 1-Year Milestone Visual Box', pageLocation: 'Section 03 on Homepage', icon: Building2, summary: '1st Year Completion badge, title, lead narrative, 1-Year milestone glowing box & 4 highlight counters' },
    { id: 'objectives', order: '05', label: 'Objectives (12)', fullTitle: '12 Aim & Guidance Objectives', pageLocation: 'Section 04 on Homepage', icon: Layers, summary: '12 core charters: Unity, Harmony, Law, Tawheed, Wilayat, Legal Protection with add/delete' },
    { id: 'founders', order: '06', label: 'Office Bearers', fullTitle: '3 Founders & Office Bearers', pageLocation: 'Section 05 on Homepage', icon: Users, summary: 'President M. Mohammed Akil, Secretary Hyder, Treasurer Syed Hasan Mohammed portraits & titles' },
    { id: 'activities', order: '07', label: 'Timeline (12)', fullTitle: '12 Timeline Activities & Milestones', pageLocation: 'Section 06 on Homepage', icon: Compass, summary: 'Democratic SIR camps, Iran Meena school relief, Mawlood biryani, student kits, Sabeel' },
    { id: 'humanitarian', order: '08', label: 'Humanitarian Aid', fullTitle: 'Humanitarian Aid & Relief Contribution', pageLocation: 'Section 07 on Homepage', icon: Heart, summary: 'Meena School reconstruction contribution (₹5,00,000), featured photograph & quote' },
    { id: 'education', order: '09', label: 'Education Support', fullTitle: 'Educational Support & Encouragement', pageLocation: 'Section 08 on Homepage', icon: BookOpen, summary: '200 Students school bag kits card, 150 Academic Achievers ₹2,000 incentive awards card' },
    { id: 'karbala', order: '10', label: 'Karbala Tribute', fullTitle: 'Karbala & Muharram Commemoration', pageLocation: 'Section 09 on Homepage', icon: Flag, summary: 'City-wide digital banners, 5,00,000 Karbala history booklets, and 10-day Peters Road Sabeel' },
    { id: 'brotherhood', order: '11', label: 'Brotherhood & Pillars', fullTitle: 'Brotherhood, 4 Core Pillars & Imam Ali Quote', pageLocation: 'Section 10 on Homepage', icon: Users, summary: '4 Core Pillars (Faith, Justice, Brotherhood, Service) and Imam Ali (AS) equality quote' },
    { id: 'mosqueGuide', order: '12', label: 'Mosque Guide', fullTitle: 'Tamil Nadu Shia Mosques Guide (5 Districts)', pageLocation: 'Section 11 on Homepage', icon: Building2, summary: 'District wise directory: Chennai (6 mosques), Vellore, Tirupattur, Ranipet, Krishnagiri' },
    { id: 'finalAppeal', order: '13', label: 'Appeal & Hotlines', fullTitle: 'Final Appeal, 3 Hotlines & WhatsApp Inquiry', pageLocation: 'Section 12 on Homepage', icon: Phone, summary: 'Together in Faith appeal, Prophet (PBUH) hadith, 3 phone hotlines, and WhatsApp inquiry form' },
    { id: 'footer', order: '14', label: 'Footer & Copyright', fullTitle: 'Footer Closing & Copyright Statement', pageLocation: 'Bottom Footer', icon: ShieldCheck, summary: 'Wassalam closing benediction, Jamaat mission summary statement, and copyright notice' },
  ];

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentTabObj = tabs[currentIndex] || tabs[0];
  const prevTab = currentIndex > 0 ? tabs[currentIndex - 1] : null;
  const nextTab = currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : null;

  const renderSectionNav = (order: string, label: string) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 mt-8">
      <div>
        {prevTab ? (
          <button
            type="button"
            onClick={() => switchTab(prevTab.id)}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ivory text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>← Previous: {prevTab.order}. {prevTab.label}</span>
          </button>
        ) : (
          <span className="text-xs text-ivory/40">First Section of Website</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleSaveActiveTab()}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
        >
          <Save size={14} />
          <span>Save Section {order}: {label}</span>
        </button>
      </div>

      <div>
        {nextTab ? (
          <button
            type="button"
            onClick={() => switchTab(nextTab.id)}
            className="px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Next: {nextTab.order}. {nextTab.label} →</span>
          </button>
        ) : (
          <span className="text-xs text-ivory/40">End of Homepage Sections</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            100% Website Content Control
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Every single line of text, heading, objective, founder portrait, and quote is completely editable by the administrator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadAllData}
            className="p-2.5 rounded-xl border border-white/10 text-ivory/70 hover:text-ivory hover:bg-white/5 transition-colors"
            title="Reload from backend"
          >
            <RefreshCw size={16} />
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
          >
            <Eye size={15} />
            <span>Preview Public Site</span>
          </a>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            <span>Save All Content</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in fade-in">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tab Navigation Pill Bar */}
      <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
            <span className="text-xs font-bold text-ivory uppercase tracking-wider">
              Website Page Order (Top to Bottom)
            </span>
            <span className="text-[11px] font-mono text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/25 font-bold">
              Section {currentTabObj.order} of 14: {currentTabObj.label}
            </span>
          </div>
          <span className="text-[11px] text-ivory/50">
            Click any section below to edit in exact homepage sequence
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-gold text-midnight font-bold shadow-lg shadow-gold/25 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-ivory/70 hover:text-ivory border border-white/5'
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isActive ? 'bg-midnight/20 text-midnight' : 'bg-gold/15 text-gold'
                  }`}
                >
                  {tab.order}
                </span>
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Panel */}
      <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        {/* SECTION 01: Brand Identity, Logo & Navigation */}
        {activeTab === 'branding' && branding && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 01 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Top Header / Navbar
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Brand Identity, Logo & Navigation</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">Jamaat organization name, emblem logo upload, helpline phone numbers, and Instagram profile.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 01</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Official Organization Name
                </label>
                <input
                  type="text"
                  value={branding.name || ''}
                  onChange={(e) => setBranding({ ...branding, name: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Acronym / Short Name
                </label>
                <input
                  type="text"
                  value={branding.shortName || ''}
                  onChange={(e) => setBranding({ ...branding, shortName: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Organization Tagline / Motto
                </label>
                <input
                  type="text"
                  value={branding.tagline || ''}
                  onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Official Instagram URL
                </label>
                <input
                  type="text"
                  value={branding.instagramUrl || ''}
                  onChange={(e) => setBranding({ ...branding, instagramUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Official WhatsApp Number
                </label>
                <input
                  type="text"
                  value={branding.whatsappNumber || ''}
                  onChange={(e) => setBranding({ ...branding, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Primary Helpline Phone
                </label>
                <input
                  type="text"
                  value={branding.primaryPhone || ''}
                  onChange={(e) => setBranding({ ...branding, primaryPhone: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={branding.email || ''}
                  onChange={(e) => setBranding({ ...branding, email: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Headquarters / Address
                </label>
                <input
                  type="text"
                  value={branding.address || ''}
                  onChange={(e) => setBranding({ ...branding, address: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Jamaat Official Emblem / Logo
                </label>
                <div className="p-4 rounded-xl bg-midnight/80 border border-white/5 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gold/30 bg-black shrink-0 flex items-center justify-center">
                    <img
                      src={adminApi.resolveImageUrl(branding.logoUrl || '/logo.jpeg')}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.endsWith('/logo.jpeg')) {
                          target.src = '/logo.jpeg';
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <ImageUploader
                      label="Upload & Replace Logo"
                      helperText="Square image recommended (PNG/JPEG/WEBP)"
                      currentImageUrl={branding.logoUrl}
                      onImageUploaded={async (url) => {
                        const updated = { ...branding, logoUrl: url };
                        setBranding(updated);
                        try {
                          await adminApi.updateBranding(updated);
                          await refreshData();
                          notifySuccess('Logo updated and applied to public website immediately!');
                        } catch (err: any) {
                          console.error('Failed to auto-save logo:', err);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          
            {renderSectionNav('01', 'Navbar & Brand')}
          </div>
        )}

        

{/* SECTION 02: Hero Section Banner & Titles */}
        {activeTab === 'hero' && content?.hero && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 02 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 01 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Hero Section Banner & Titles</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">Main serif heading, 1st Year Completion Report subtitle, mission tagline & primary action buttons.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 02</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={content.hero.title || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Subtitle / Completion Tag
                </label>
                <input
                  type="text"
                  value={content.hero.subtitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Hero Tagline / Motto
                </label>
                <input
                  type="text"
                  value={content.hero.tagline || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, tagline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Hero Narrative Paragraph
                </label>
                <textarea
                  rows={4}
                  value={content.hero.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryButtonText || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryButtonLink || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryButtonLink: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryButtonText || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryButtonLink || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryButtonLink: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          
            {renderSectionNav('02', 'Hero Banner')}
          </div>
        )}

        

{/* SECTION 03: Holy Bismillah & Sacred Quranic Verse */}
        {activeTab === 'quotes' && content?.quotes && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 03 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 02 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Holy Bismillah & Sacred Quranic Verse</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">Bismillah calligraphy in Arabic, English translation, and Surah Al-Ma\'idah 5:2 verse citation.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 03</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Bismillah */}
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/5 space-y-3">
                <h3 className="text-sm font-serif font-bold text-gold">Bismillah Header</h3>
                <input
                  type="text"
                  placeholder="Arabic Text"
                  value={content.quotes.bismillahArabic || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: { ...content.quotes, bismillahArabic: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold font-serif"
                />
                <input
                  type="text"
                  placeholder="English Translation"
                  value={content.quotes.bismillahTranslation || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: { ...content.quotes, bismillahTranslation: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
              </div>

              {/* Quran Quote */}
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/5 space-y-3">
                <h3 className="text-sm font-serif font-bold text-gold">Quranic Verse</h3>
                <input
                  type="text"
                  placeholder="Verse Text"
                  value={content.quotes.quran?.text || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: {
                        ...content.quotes,
                        quran: { ...content.quotes.quran, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="Citation (e.g. Surah Al-Ma'idah 5:2)"
                  value={content.quotes.quran?.source || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: {
                        ...content.quotes,
                        quran: { ...content.quotes.quran, source: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
              </div>

              {/* Prophet Quote */}
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/5 space-y-3">
                <h3 className="text-sm font-serif font-bold text-gold">Prophet Muhammad (PBUH) Quote</h3>
                <input
                  type="text"
                  placeholder="Quote Text"
                  value={content.quotes.prophet?.text || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: {
                        ...content.quotes,
                        prophet: { ...content.quotes.prophet, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="Source"
                  value={content.quotes.prophet?.source || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: {
                        ...content.quotes,
                        prophet: { ...content.quotes.prophet, source: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
              </div>

              {/* Imam Ali Quote */}
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/5 space-y-3">
                <h3 className="text-sm font-serif font-bold text-gold">Imam Ali (AS) Quote</h3>
                <input
                  type="text"
                  placeholder="Quote Text"
                  value={content.quotes.imamAli?.text || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: {
                        ...content.quotes,
                        imamAli: { ...content.quotes.imamAli, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="Source"
                  value={content.quotes.imamAli?.source || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      quotes: {
                        ...content.quotes,
                        imamAli: { ...content.quotes.imamAli, source: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-ivory text-sm focus:border-gold"
                />
              </div>
            </div>
          
            {renderSectionNav('03', 'Quran Verse')}
          </div>
        )}

        

{/* SECTION 04: About Jamaat & 1-Year Milestone Visual Box */}
        {activeTab === 'about' && content?.about && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 04 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 03 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">About Jamaat & 1-Year Milestone Visual Box</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">1st Year Completion badge, narrative story, 1-Year glowing visual box & 4 highlight counters.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 04</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    About Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.about.badge || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    About Section Title
                  </label>
                  <input
                    type="text"
                    value={content.about.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  About Lead Introduction Story
                </label>
                <textarea
                  rows={3}
                  value={content.about.leadText || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, leadText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              {/* Milestone Box Controls */}
              <div className="p-6 rounded-2xl bg-midnight/90 border border-gold/30 shadow-lg shadow-gold/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                      <Sparkles size={14} className="text-gold" />
                      Milestone Visual Display Box
                    </h3>
                    <p className="text-[11px] text-ivory/60 mt-0.5">
                      Controls the large circular highlight graphic rendered on the public About section.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Visual Live Preview Indicator */}
                    <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-gold/25 flex items-center gap-2 text-xs">
                      <span className="text-ivory/50 text-[10px] uppercase font-mono">Live Preview:</span>
                      <span className="font-serif font-bold text-gold">{content.about.milestoneNumber || '1'}</span>
                      <span className="text-ivory uppercase tracking-widest text-[10px]">{content.about.milestoneUnit || 'Year'}</span>
                      <span className="text-gold/60 text-[10px] uppercase">{content.about.milestoneLabel || 'Milestone'}</span>
                    </div>

                    {/* Direct Save Milestone Button */}
                    <button
                      type="button"
                      onClick={() => handleSaveActiveTab()}
                      disabled={saving}
                      className="px-4 py-2 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-md shadow-gold/20 flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50 shrink-0"
                    >
                      {saving ? <Loader2 className="animate-spin" size={13} /> : <Save size={13} />}
                      <span>Save Milestone</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/70 mb-1">
                      Number (e.g. 1)
                    </label>
                    <input
                      type="text"
                      value={content.about.milestoneNumber ?? ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, milestoneNumber: e.target.value },
                        })
                      }
                      placeholder="1"
                      className="w-full px-4 py-2.5 bg-black/50 border border-gold/30 rounded-xl text-base text-gold font-bold focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/70 mb-1">
                      Unit (e.g. Year)
                    </label>
                    <input
                      type="text"
                      value={content.about.milestoneUnit ?? ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, milestoneUnit: e.target.value },
                        })
                      }
                      placeholder="Year"
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-sm text-ivory font-semibold focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/70 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={content.about.milestoneLabel ?? ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, milestoneLabel: e.target.value },
                        })
                      }
                      placeholder="Milestone"
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-sm text-ivory font-semibold focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="p-5 rounded-xl bg-midnight/80 border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gold">
                  4 Milestone Highlight Stats Cards
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {(content.about.stats || []).map((st: any, idx: number) => (
                    <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
                      <span className="text-[10px] text-gold uppercase font-mono">Card #{idx + 1}</span>
                      <input
                        type="text"
                        placeholder="Value (e.g. 200+)"
                        value={st.value || ''}
                        onChange={(e) => {
                          const newStats = [...(content.about.stats || [])];
                          newStats[idx] = { ...newStats[idx], value: e.target.value };
                          setContent({
                            ...content,
                            about: { ...content.about, stats: newStats },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-midnight border border-white/10 rounded-lg text-sm text-ivory font-bold focus:border-gold"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Students Supported)"
                        value={st.label || ''}
                        onChange={(e) => {
                          const newStats = [...(content.about.stats || [])];
                          newStats[idx] = { ...newStats[idx], label: e.target.value };
                          setContent({
                            ...content,
                            about: { ...content.about, stats: newStats },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-midnight border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Footer Save Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-ivory/60">
                  Ready to publish About & Milestone changes to the public website?
                </p>
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save About Section Changes</span>
                </button>
              </div>
            </div>
          
            {renderSectionNav('04', 'About & Milestone')}
          </div>
        )}

        

{/* SECTION 05: 12 Aim & Guidance Objectives */}
        {activeTab === 'objectives' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 05 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 04 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">12 Aim & Guidance Objectives</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">12 core charters: Unity, Religious Harmony, Respect for Law, Tawheed, Wilayat, Legal Protection.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={addObjective}
                  className="px-4 py-2.5 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Objective</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 05</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj, idx) => (
                <div
                  key={obj.id || idx}
                  className="p-4 rounded-xl bg-midnight/80 border border-white/10 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeObjective(idx)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Delete objective"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Objective Title
                    </label>
                    <input
                      type="text"
                      value={obj.title || ''}
                      onChange={(e) => updateObjective(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-ivory font-semibold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      value={obj.desc || ''}
                      onChange={(e) => updateObjective(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory leading-relaxed focus:border-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
          
            {renderSectionNav('05', 'Objectives (12)')}
          </div>
        )}

        

{/* SECTION 06: 3 Founders & Office Bearers */}
        {activeTab === 'founders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 06 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 05 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">3 Founders & Office Bearers</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">President M. Mohammed Akil, Secretary Hyder, Treasurer Syed Hasan Mohammed portraits & titles.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={addFounder}
                  className="px-4 py-2.5 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Founder</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 06</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {founders.map((f, idx) => (
                <div
                  key={f.id || idx}
                  className="p-5 rounded-2xl bg-midnight/80 border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">
                      Leader #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFounder(idx)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Photo Preview & Uploader */}
                  <div className="aspect-square rounded-xl overflow-hidden border border-gold/30 bg-black">
                    <img
                      src={adminApi.resolveImageUrl(f.image)}
                      alt={f.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ImageUploader
                    label=""
                    helperText="Upload leader photo"
                    currentImageUrl={f.image}
                    onImageUploaded={(url) => updateFounder(idx, 'image', url)}
                  />

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={f.name || ''}
                      onChange={(e) => updateFounder(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-ivory font-semibold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      value={f.role || ''}
                      onChange={(e) => updateFounder(idx, 'role', e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-gold focus:border-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
          
            {renderSectionNav('06', 'Office Bearers')}
          </div>
        )}

        

{/* SECTION 07: 12 Timeline Activities & Milestones */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 07 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 06 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">12 Timeline Activities & Milestones</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">Democratic SIR camps, Iran Meena school relief, Mawlood biryani, student kits, Sabeel.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={addActivity}
                  className="px-4 py-2.5 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Activity</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 07</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((act, idx) => (
                <div
                  key={act.id || idx}
                  className="p-4 rounded-xl bg-midnight/80 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold uppercase font-mono">
                      Event #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeActivity(idx)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Activity Title
                      </label>
                      <input
                        type="text"
                        value={act.title || ''}
                        onChange={(e) => updateActivity(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-ivory font-semibold focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Stat / Badge Text
                      </label>
                      <input
                        type="text"
                        value={act.stat || ''}
                        onChange={(e) => updateActivity(idx, 'stat', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-gold focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Icon Name (vote, globe, utensils, droplet, book-open, users, etc.)
                    </label>
                    <input
                      type="text"
                      value={act.icon ?? ''}
                      onChange={(e) => updateActivity(idx, 'icon', e.target.value)}
                      placeholder="users"
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-ivory focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Event Description
                    </label>
                    <textarea
                      rows={2}
                      value={act.description || ''}
                      onChange={(e) => updateActivity(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
          
            {renderSectionNav('07', 'Timeline (12)')}
          </div>
        )}

        

{/* SECTION 08: Humanitarian Aid & Relief Contribution */}
        {activeTab === 'humanitarian' && content?.humanitarian && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 08 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 07 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Humanitarian Aid & Relief Contribution</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">Meena School reconstruction contribution (₹5,00,000), featured photograph & quote.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 08</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.humanitarian.badge || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        humanitarian: { ...content.humanitarian, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.humanitarian.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        humanitarian: { ...content.humanitarian, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Detailed Narrative
                </label>
                <textarea
                  rows={3}
                  value={content.humanitarian.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      humanitarian: { ...content.humanitarian, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Contribution Label
                  </label>
                  <input
                    type="text"
                    value={content.humanitarian.contributionLabel || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        humanitarian: { ...content.humanitarian, contributionLabel: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Contribution Amount
                  </label>
                  <input
                    type="text"
                    value={content.humanitarian.contributionValue || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        humanitarian: { ...content.humanitarian, contributionValue: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm font-bold text-gold focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Featured Humanitarian Quote
                </label>
                <input
                  type="text"
                  value={content.humanitarian.quote || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      humanitarian: { ...content.humanitarian, quote: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Humanitarian Aid Featured Photograph
                </label>
                <div className="p-4 rounded-xl bg-midnight border border-white/5 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-32 rounded-xl overflow-hidden border border-gold/30 bg-black shrink-0">
                    <img
                      src={adminApi.resolveImageUrl(content.humanitarian.image || '/picture1.jpeg')}
                      alt="Aid"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <ImageUploader
                      label="Upload & Replace Photo"
                      helperText="Supports high resolution photographs"
                      currentImageUrl={content.humanitarian.image}
                      onImageUploaded={(url) =>
                        setContent({
                          ...content,
                          humanitarian: { ...content.humanitarian, image: url },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          
            {renderSectionNav('08', 'Humanitarian Aid')}
          </div>
        )}

        

{/* SECTION 09: Educational Support & Encouragement */}
        {activeTab === 'education' && content?.education && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 09 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 08 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Educational Support & Encouragement</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">200 Students school bag kits card, 150 Academic Achievers ₹2,000 incentive awards card.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 09</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.education.badge || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        education: { ...content.education, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.education.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        education: { ...content.education, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={content.education.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      education: { ...content.education, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* 2 Scholarship Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {(content.education.cards || []).map((card: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-midnight/80 border border-white/10 space-y-3">
                    <span className="text-xs font-bold text-gold uppercase">Card #{idx + 1}</span>
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Metric / Value (e.g. 200, 150)
                      </label>
                      <input
                        type="text"
                        value={card.value || ''}
                        onChange={(e) => {
                          const newCards = [...(content.education.cards || [])];
                          newCards[idx] = { ...newCards[idx], value: e.target.value };
                          setContent({
                            ...content,
                            education: { ...content.education, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-gold font-bold focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const newCards = [...(content.education.cards || [])];
                          newCards[idx] = { ...newCards[idx], title: e.target.value };
                          setContent({
                            ...content,
                            education: { ...content.education, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-ivory font-semibold focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={card.desc || ''}
                        onChange={(e) => {
                          const newCards = [...(content.education.cards || [])];
                          newCards[idx] = { ...newCards[idx], desc: e.target.value };
                          setContent({
                            ...content,
                            education: { ...content.education, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
            {renderSectionNav('09', 'Education Support')}
          </div>
        )}

        

{/* SECTION 10: Karbala & Muharram Commemoration */}
        {activeTab === 'karbala' && content?.karbala && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 10 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 09 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Karbala & Muharram Commemoration</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">City-wide digital banners, 5,000 Karbala booklets, and 10-day Peters Road Sabeel service.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 10</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.karbala.badge || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        karbala: { ...content.karbala, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.karbala.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        karbala: { ...content.karbala, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* 3 Campaign Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {(content.karbala.cards || []).map((card: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-midnight/80 border border-white/10 space-y-3">
                    <span className="text-xs font-bold text-gold uppercase">Campaign Card #{idx + 1}</span>
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const newCards = [...(content.karbala.cards || [])];
                          newCards[idx] = { ...newCards[idx], title: e.target.value };
                          setContent({
                            ...content,
                            karbala: { ...content.karbala, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-ivory font-semibold focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        value={card.desc || ''}
                        onChange={(e) => {
                          const newCards = [...(content.karbala.cards || [])];
                          newCards[idx] = { ...newCards[idx], desc: e.target.value };
                          setContent({
                            ...content,
                            karbala: { ...content.karbala, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory leading-relaxed focus:border-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
            {renderSectionNav('10', 'Karbala Tribute')}
          </div>
        )}

        

{/* SECTION 11: Brotherhood, 4 Core Pillars & Imam Ali Quote */}
        {activeTab === 'brotherhood' && content?.brotherhood && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 11 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 10 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Brotherhood, 4 Core Pillars & Imam Ali Quote</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">4 Core Pillars (Faith, Justice, Brotherhood, Service) and Imam Ali (AS) equality quote.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 11</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Core Pillars (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(content.brotherhood.pillars || []).join(', ')}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      brotherhood: {
                        ...content.brotherhood,
                        pillars: e.target.value.split(',').map((p) => p.trim()),
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Imam Ali (AS) Quote Text
                </label>
                <textarea
                  rows={2}
                  value={content.brotherhood.quote?.text || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      brotherhood: {
                        ...content.brotherhood,
                        quote: { ...content.brotherhood.quote, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Quote Citation / Source
                </label>
                <input
                  type="text"
                  value={content.brotherhood.quote?.source || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      brotherhood: {
                        ...content.brotherhood,
                        quote: { ...content.brotherhood.quote, source: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          
            {renderSectionNav('11', 'Brotherhood & Pillars')}
          </div>
        )}

        

{/* SECTION 12: Tamil Nadu Shia Mosques Guide (5 Districts) */}
        {activeTab === 'mosqueGuide' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 12 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 11 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Tamil Nadu Shia Mosques Guide (5 Districts)</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">District wise directory: Chennai (6 mosques), Vellore, Tirupattur, Ranipet, Krishnagiri.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={addDistrict}
                  className="px-4 py-2.5 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add District</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 12</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {mosqueGuide.map((dist, dIdx) => (
                <div
                  key={dIdx}
                  className="p-5 rounded-2xl bg-midnight/80 border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={dist.district || ''}
                      onChange={(e) => updateDistrictName(dIdx, e.target.value)}
                      placeholder="District Name (e.g. Chennai District)"
                      className="px-4 py-2 bg-black/50 border border-gold/30 rounded-xl text-base font-bold text-gold focus:border-gold w-full max-w-md"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addMosqueToDistrict(dIdx)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Plus size={13} />
                        <span>Add Mosque</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeDistrict(dIdx)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete entire district"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(dist.mosques || []).map((m: any, mIdx: number) => (
                      <div
                        key={mIdx}
                        className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-ivory/50 uppercase font-mono">
                            Mosque #{mIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeMosqueFromDistrict(dIdx, mIdx)}
                            className="text-red-400 hover:text-red-300 p-1 rounded"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Mosque / Imambara Name"
                          value={m.name || ''}
                          onChange={(e) => updateMosqueField(dIdx, mIdx, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-midnight border border-white/10 rounded-lg text-xs font-semibold text-ivory focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Location / Area"
                          value={m.location || ''}
                          onChange={(e) => updateMosqueField(dIdx, mIdx, 'location', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-midnight border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Special Note (e.g. 250+ Years Old)"
                          value={m.note || ''}
                          onChange={(e) => updateMosqueField(dIdx, mIdx, 'note', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-midnight border border-white/10 rounded-lg text-xs text-gold/80 focus:border-gold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          
            {renderSectionNav('12', 'Mosque Guide')}
          </div>
        )}

        

{/* SECTION 13: Final Appeal, 3 Hotlines & WhatsApp Inquiry */}
        {activeTab === 'finalAppeal' && content?.finalAppeal && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 13 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Section 12 on Homepage
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Final Appeal, 3 Hotlines & WhatsApp Inquiry</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">Together in Faith appeal, Prophet (PBUH) hadith, 3 phone hotlines, and WhatsApp inquiry form.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 13</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Appeal Section Title
                </label>
                <input
                  type="text"
                  value={content.finalAppeal.title || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalAppeal: { ...content.finalAppeal, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Appeal Description
                </label>
                <textarea
                  rows={3}
                  value={content.finalAppeal.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalAppeal: { ...content.finalAppeal, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Helpline Phone Numbers (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(content.finalAppeal.phoneNumbers || []).join(', ')}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalAppeal: {
                        ...content.finalAppeal,
                        phoneNumbers: e.target.value.split(',').map((p) => p.trim()),
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={content.finalAppeal.whatsappNumber || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      finalAppeal: { ...content.finalAppeal, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold"
                />
              </div>

                          </div>
          
            {renderSectionNav('13', 'Appeal & Hotlines')}
          </div>
        )}


        {/* TAB 14: Footer & Copyright Notice */}
        {activeTab === 'footer' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gold/15 text-gold border border-gold/30">
                    SECTION 14 OF 14
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-ivory/60 border border-white/10">
                    📍 Bottom Footer
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-ivory">Footer Closing & Copyright Statement</h2>
                <p className="text-xs text-ivory/60 mt-1 max-w-2xl">
                  Spiritual sign-off benediction, Jamaat mission summary statement, and copyright notice.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleSaveActiveTab()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>Save Section 14</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Closing Benediction Preview */}
              <div className="p-4 rounded-xl bg-midnight/80 border border-gold/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif text-xl font-bold shrink-0">
                  W
                </div>
                <div>
                  <p className="font-serif text-lg text-gold font-bold">Wassalam</p>
                  <p className="text-xs text-ivory/70">{branding?.name || 'Tamil Nadu Shia Muslim Jamaat'}</p>
                  <p className="text-[11px] text-ivory/40 mt-0.5">Spiritual sign-off prominently displayed above the copyright in the footer</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Footer Mission Summary Statement
                </label>
                <textarea
                  rows={3}
                  value={content?.footer?.aboutText || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...(content?.footer || {}), aboutText: e.target.value },
                    })
                  }
                  placeholder="Dedicated to serving the community through humanitarian aid, educational support, and upholding justice and brotherhood."
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold leading-relaxed"
                />
                <p className="text-xs text-ivory/40 mt-1">
                  Appears beneath the emblem logo and organization title on the footer.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                  Official Copyright Notice
                </label>
                <input
                  type="text"
                  value={content?.footer?.copyrightText || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...(content?.footer || {}), copyrightText: e.target.value },
                    })
                  }
                  placeholder="© 2026 Tamil Nadu Shia Muslim Jamaat. All rights reserved."
                  className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold font-mono text-xs"
                />
              </div>

              {/* Developer attribution note */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs text-ivory/50">
                <span>Website Development Credits:</span>
                <span className="text-gold font-bold">Echo Digital Works</span>
              </div>
            </div>

            {renderSectionNav('14', 'Footer')}
          </div>
        )}

        {/* Sticky Action Bar */}
        <div className="sticky bottom-4 z-40 bg-[#0E121B]/95 backdrop-blur-xl border border-gold/30 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <p className="text-xs text-ivory/80">
              Active Section: <strong className="text-gold font-mono font-bold mr-1">[{currentTabObj?.order || "01"}]</strong><strong className="text-gold uppercase tracking-wider">{currentTabObj?.label || activeTab}</strong>
              <span className="text-ivory/40 ml-2 hidden md:inline">| All modifications persist directly to live database</span>
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSaveActiveTab}
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={15} />
                  <span>Saving Section...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Save {activeTab.toUpperCase()} Section</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gold/40 hover:bg-gold/10 text-gold font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span>Save All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
