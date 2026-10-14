import React, { useState, useEffect } from 'react';
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Film,
  Building,
  Image as ImageIcon,
  Smartphone,
  Monitor
} from 'lucide-react';
import adminApi from '../services/adminApi';
import ImageUploader from '../components/ImageUploader';
import { useSiteData } from '../../context/SiteDataContext';

type MediaTab = 'hero' | 'gallery' | 'mosques' | 'videos';

const authenticMosques = [
  { id: 'mosque-1', title: 'Masjid-e-Abbasiya', location: 'Thousand Lights, Chennai (250+ Years Old)', url: '/mosque/img41.jpeg' },
  { id: 'mosque-2', title: 'Masjid-e-Hussaini', location: 'Royapettah, Chennai', url: '/mosque/img42.jpeg' },
  { id: 'mosque-3', title: 'Asthana-e-Qasim', location: 'Triplicane, Chennai (180 Year Old Procession)', url: '/mosque/img43.jpeg' },
  { id: 'mosque-4', title: 'Masjid-e-Ali / Asthana-e-Moula Ali Dargah', location: 'Pallavaram, Chennai (400+ Years Old)', url: '/mosque/img44.jpeg' },
  { id: 'mosque-5', title: 'Masjid-e-Hussaini', location: 'Perambur, Chennai', url: '/mosque/img45.jpeg' },
  { id: 'mosque-6', title: 'Mehfil-E-Khuddamul Maassumeen (Aashurkhana)', location: 'Parrys, Angappan Naicken Street, Chennai', url: '/mosque/img46.jpeg' },
  { id: 'mosque-7', title: 'Masjid-e-Abu Talib', location: 'Vellore District', url: '/mosque/img47.jpeg' },
  { id: 'mosque-8', title: 'Masjid-e-Hussaini', location: 'Thoraipadi, Tirupattur District', url: '/mosque/img48.jpeg' },
  { id: 'mosque-9', title: 'Masjid-e-Ashnashari', location: 'Vaniyambadi, Tirupattur District', url: '/mosque/img49.jpeg' },
  { id: 'mosque-10', title: 'Masjid-e-Asadullah', location: 'Baqar Abad, Ranipet District', url: '/mosque/img50.jpeg' }
];

export const ImageManagement: React.FC = () => {
  const { refreshData } = useSiteData();

  const [activeTab, setActiveTab] = useState<MediaTab>('hero');
  const [images, setImages] = useState<any>({
    heroDesktop: [],
    heroMobile: [],
    gallery: [],
    mosqueGallery: [],
  });
  const [videos, setVideos] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadAllMedia();
  }, []);

  const loadAllMedia = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const [imgRes, vidRes] = await Promise.all([
        adminApi.getImages(),
        adminApi.getVideos(),
      ]);

      if (imgRes?.data) {
        let loadedMosques = imgRes.data.mosqueGallery || [];
        if (!Array.isArray(loadedMosques) || loadedMosques.length === 0) {
          loadedMosques = authenticMosques;
        } else {
          loadedMosques = loadedMosques.map((item: any, idx: number) => {
            const fallback = authenticMosques[idx] || {
              id: `mosque-${idx + 1}`,
              title: `Sacred Mosque #${idx + 1}`,
              location: 'Tamil Nadu',
              url: `/mosque/img${41 + (idx % 10)}.jpeg`,
            };
            if (typeof item === 'string') {
              let url = item;
              if (url.includes('/images/img4') || url.includes('/images/img5')) {
                url = url.replace('/images/', '/mosque/');
              }
              return { id: `mosque-${idx + 1}`, title: fallback.title, location: fallback.location, url };
            }
            let url = item.url || fallback.url;
            if (url.includes('/images/img4') || url.includes('/images/img5')) {
              url = url.replace('/images/', '/mosque/');
            }
            const isDefaultTitle = !item.title || item.title.startsWith('Sacred Mosque #') || item.title.startsWith('Mosque #');
            const isDefaultLocation = !item.location || item.location === 'Tamil Nadu';
            return {
              ...item,
              id: item.id || `mosque-${idx + 1}`,
              url,
              title: isDefaultTitle ? fallback.title : item.title,
              location: isDefaultLocation ? fallback.location : item.location,
            };
          });
        }

        setImages({
          heroDesktop: imgRes.data.heroDesktop || [],
          heroMobile: imgRes.data.heroMobile || [],
          gallery: imgRes.data.gallery || [],
          mosqueGallery: loadedMosques,
        });
      }

      if (Array.isArray(vidRes?.data)) {
        setVideos(vidRes.data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load media assets');
    } finally {
      setLoading(false);
    }
  };

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await Promise.all([
        adminApi.updateImages(images),
        adminApi.updateVideos(videos),
      ]);

      notifySuccess('All images, slideshows, and video highlights updated successfully!');
      await refreshData();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save media changes');
    } finally {
      setSaving(false);
    }
  };

  // --- Handlers: Hero Desktop ---
  const addHeroDesktopImage = (url: string) => {
    setImages((prev: any) => ({
      ...prev,
      heroDesktop: [...(prev.heroDesktop || []), url],
    }));
  };

  const removeHeroDesktopImage = (index: number) => {
    setImages((prev: any) => ({
      ...prev,
      heroDesktop: prev.heroDesktop.filter((_: any, i: number) => i !== index),
    }));
  };

  // --- Handlers: Hero Mobile ---
  const addHeroMobileImage = (url: string) => {
    setImages((prev: any) => ({
      ...prev,
      heroMobile: [...(prev.heroMobile || []), url],
    }));
  };

  const removeHeroMobileImage = (index: number) => {
    setImages((prev: any) => ({
      ...prev,
      heroMobile: prev.heroMobile.filter((_: any, i: number) => i !== index),
    }));
  };

  // --- Handlers: Social Work Gallery ---
  const addGalleryItem = () => {
    const newItem = {
      id: `gal-${Date.now()}`,
      title: 'New Social Initiative',
      category: 'Welfare',
      url: '/hero/hero-1.png',
    };
    setImages((prev: any) => ({
      ...prev,
      gallery: [...(prev.gallery || []), newItem],
    }));
  };

  const updateGalleryItem = (index: number, field: string, value: string) => {
    const updated = [...(images.gallery || [])];
    const current = updated[index];
    if (typeof current === 'string') {
      updated[index] = { url: current, title: '', category: 'Welfare', [field]: value };
    } else {
      updated[index] = { ...current, [field]: value };
    }
    setImages({ ...images, gallery: updated });
  };

  const removeGalleryItem = (index: number) => {
    setImages((prev: any) => ({
      ...prev,
      gallery: prev.gallery.filter((_: any, i: number) => i !== index),
    }));
  };

  // --- Handlers: Sacred Mosques Gallery ---
  const addMosqueItem = () => {
    const nextIdx = (images.mosqueGallery || []).length;
    const fallback = authenticMosques[nextIdx % authenticMosques.length];
    const newItem = {
      id: `mosque-${Date.now()}`,
      title: fallback.title,
      location: fallback.location,
      url: `/mosque/img${41 + (nextIdx % 10)}.jpeg`,
    };
    setImages((prev: any) => ({
      ...prev,
      mosqueGallery: [...(prev.mosqueGallery || []), newItem],
    }));
  };

  const updateMosqueItem = (index: number, field: string, value: string) => {
    const updated = [...(images.mosqueGallery || [])];
    const current = updated[index];
    const fallback = authenticMosques[index % authenticMosques.length];
    if (typeof current === 'string') {
      let rawUrl = current;
      if (rawUrl.includes('/images/img4') || rawUrl.includes('/images/img5')) {
        rawUrl = rawUrl.replace('/images/', '/mosque/');
      }
      updated[index] = {
        id: `mosque-${index + 1}`,
        url: rawUrl,
        title: fallback.title,
        location: fallback.location,
        [field]: value
      };
    } else {
      updated[index] = { ...current, [field]: value };
    }
    setImages({ ...images, mosqueGallery: updated });
  };

  const removeMosqueItem = (index: number) => {
    setImages((prev: any) => ({
      ...prev,
      mosqueGallery: prev.mosqueGallery.filter((_: any, i: number) => i !== index),
    }));
  };

  // --- Handlers: Videos ---
  const addVideoItem = () => {
    const nextId = videos.length > 0 ? Math.max(...videos.map((v) => Number(v.id) || 0)) + 1 : 1;
    setVideos([
      ...videos,
      {
        id: nextId,
        title: `Community Video ${nextId}`,
        src: `/videos/vid${nextId}.mp4`,
        thumbnail: `/images/img${nextId}.jpeg`,
      },
    ]);
  };

  const updateVideoItem = (index: number, field: string, value: string) => {
    const updated = [...videos];
    updated[index] = { ...updated[index], [field]: value };
    setVideos(updated);
  };

  const removeVideoItem = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Loading media assets and videos from server...</p>
      </div>
    );
  }

  const galleryItems = images.gallery || [];
  const mosqueItems = images.mosqueGallery || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            100% Image, Media & Video Control
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Upload and replace hero slideshows, social work photos, mosque portraits, and documentary videos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadAllMedia}
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
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            <span>Save All Media</span>
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

      {/* Tab Selector */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'hero', label: 'Hero Slideshows', icon: Monitor, count: (images.heroDesktop?.length || 0) + (images.heroMobile?.length || 0) },
          { id: 'gallery', label: 'Social Work Gallery', icon: ImageIcon, count: galleryItems.length },
          { id: 'mosques', label: 'Sacred Mosque Gallery', icon: Building, count: mosqueItems.length },
          { id: 'videos', label: 'Documentary Videos', icon: Film, count: videos.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as MediaTab)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'border border-gold/40 text-gold bg-gold/15 shadow-sm shadow-gold/10'
                  : 'text-ivory/60 hover:text-ivory hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 text-ivory">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* TAB 1: Hero Slideshows */}
      {activeTab === 'hero' && (
        <div className="space-y-8">
          {/* Desktop Slideshow */}
          <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Monitor className="text-gold" size={20} />
                <div>
                  <h2 className="font-serif text-lg font-bold text-ivory">
                    Desktop Hero Backgrounds
                  </h2>
                  <p className="text-xs text-ivory/60">
                    Full-width widescreen slideshow background images cycling automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.heroDesktop?.map((url: string, idx: number) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-white/10 bg-midnight aspect-video shadow-md"
                >
                  <img
                    src={adminApi.resolveImageUrl(url)}
                    alt={`Hero Desktop ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3">
                    <span className="text-xs font-mono font-semibold text-ivory">
                      Desktop Slide #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHeroDesktopImage(idx)}
                      className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                      title="Remove slide"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="aspect-video">
                <ImageUploader
                  label="Add Desktop Slide"
                  helperText="Upload landscape 16:9 photo"
                  onImageUploaded={(url) => addHeroDesktopImage(url)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Slideshow */}
          <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Smartphone className="text-gold" size={20} />
                <div>
                  <h2 className="font-serif text-lg font-bold text-ivory">
                    Mobile Hero Backgrounds
                  </h2>
                  <p className="text-xs text-ivory/60">
                    Portrait-optimized hero backgrounds for smartphone displays.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {images.heroMobile?.map((url: string, idx: number) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-white/10 bg-midnight aspect-[9/16] shadow-md"
                >
                  <img
                    src={adminApi.resolveImageUrl(url)}
                    alt={`Hero Mobile ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3">
                    <span className="text-xs font-mono font-semibold text-ivory">
                      Mobile #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHeroMobileImage(idx)}
                      className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                      title="Remove slide"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="aspect-[9/16]">
                <ImageUploader
                  label="Add Mobile Slide"
                  helperText="Portrait 9:16 format"
                  onImageUploaded={(url) => addHeroMobileImage(url)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Social Work Gallery */}
      {activeTab === 'gallery' && (
        <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-ivory">
                Social Work Gallery ({galleryItems.length} Photographs)
              </h2>
              <p className="text-xs text-ivory/60">
                All community service, Sabeel water distribution, and flood relief photographs shown in the social work grid.
              </p>
            </div>
            <button
              type="button"
              onClick={addGalleryItem}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold text-xs font-semibold transition-colors"
            >
              <Plus size={15} />
              <span>Add New Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item: any, idx: number) => {
              const itemUrl = typeof item === 'string' ? item : item.url;
              const itemTitle = typeof item === 'string' ? `Social Work Photo #${idx + 1}` : (item.title || `Photo #${idx + 1}`);
              const itemCategory = typeof item === 'string' ? 'Welfare' : (item.category || 'Welfare');

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-midnight/80 border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-black">
                      <img
                        src={adminApi.resolveImageUrl(itemUrl)}
                        alt={itemTitle}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-mono text-gold border border-gold/30">
                        #{idx + 1}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Caption / Title
                      </label>
                      <input
                        type="text"
                        value={itemTitle}
                        onChange={(e) => updateGalleryItem(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={itemCategory}
                        onChange={(e) => updateGalleryItem(idx, 'category', e.target.value)}
                        className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <ImageUploader
                      compact
                      currentImageUrl={itemUrl}
                      onImageUploaded={(newUrl) => updateGalleryItem(idx, 'url', newUrl)}
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(idx)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete photo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Sacred Mosques Gallery */}
      {activeTab === 'mosques' && (
        <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-ivory">
                Sacred Mosques Gallery ({mosqueItems.length} Photographs)
              </h2>
              <p className="text-xs text-ivory/60">
                Spiritual centers, historic Imambaras, and sacred gathering portraits across Tamil Nadu.
              </p>
            </div>
            <button
              type="button"
              onClick={addMosqueItem}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold text-xs font-semibold transition-colors"
            >
              <Plus size={15} />
              <span>Add Mosque Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mosqueItems.map((item: any, idx: number) => {
              const fallback = authenticMosques[idx % authenticMosques.length];
              let rawUrl = typeof item === 'string' ? item : (item?.url || fallback.url);
              if (rawUrl.includes('/images/img4') || rawUrl.includes('/images/img5')) {
                rawUrl = rawUrl.replace('/images/', '/mosque/');
              }
              const itemUrl = rawUrl;
              const isDefaultTitle = !item?.title || item?.title.startsWith('Sacred Mosque #') || item?.title.startsWith('Mosque #');
              const itemTitle = typeof item === 'string' ? fallback.title : (isDefaultTitle ? fallback.title : item.title);
              const isDefaultLoc = !item?.location || item?.location === 'Tamil Nadu';
              const itemLoc = typeof item === 'string' ? fallback.location : (isDefaultLoc ? fallback.location : item.location);

              return (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-xl bg-midnight/80 border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-black">
                      <img
                        src={adminApi.resolveImageUrl(itemUrl)}
                        alt={itemTitle}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-mono text-gold border border-gold/30">
                        #{idx + 1} • {itemTitle}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        Mosque Name
                      </label>
                      <input
                        type="text"
                        value={itemTitle}
                        onChange={(e) => updateMosqueItem(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory focus:border-gold font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                        District / Location
                      </label>
                      <input
                        type="text"
                        value={itemLoc}
                        onChange={(e) => updateMosqueItem(idx, 'location', e.target.value)}
                        className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <ImageUploader
                      compact
                      currentImageUrl={itemUrl}
                      onImageUploaded={(newUrl) => updateMosqueItem(idx, 'url', newUrl)}
                    />
                    <button
                      type="button"
                      onClick={() => removeMosqueItem(idx)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete mosque photo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Documentary Videos */}
      {activeTab === 'videos' && (
        <div className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-ivory">
                Documentary Video Highlights ({videos.length} Videos)
              </h2>
              <p className="text-xs text-ivory/60">
                Videos featured in the 3x3 interactive documentary grid with custom thumbnail previews.
              </p>
            </div>
            <button
              type="button"
              onClick={addVideoItem}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold text-xs font-semibold transition-colors"
            >
              <Plus size={15} />
              <span>Add Video</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid: any, idx: number) => (
              <div
                key={vid.id || idx}
                className="p-5 rounded-xl bg-midnight/80 border border-white/10 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-black">
                    <img
                      src={adminApi.resolveImageUrl(vid.thumbnail)}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-mono text-gold border border-gold/30">
                      Video #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={vid.title || ''}
                      onChange={(e) => updateVideoItem(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-ivory font-semibold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ivory/60 uppercase mb-1">
                      Video Source File / URL
                    </label>
                    <input
                      type="text"
                      value={vid.src || ''}
                      onChange={(e) => updateVideoItem(idx, 'src', e.target.value)}
                      placeholder="/videos/vid1.mp4 or URL"
                      className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-ivory focus:border-gold"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <label className="block text-[11px] font-semibold text-ivory/60 uppercase">
                    Thumbnail Poster
                  </label>
                  <div className="flex items-center justify-between">
                    <ImageUploader
                      compact
                      currentImageUrl={vid.thumbnail}
                      onImageUploaded={(newThumb) => updateVideoItem(idx, 'thumbnail', newThumb)}
                    />
                    <button
                      type="button"
                      onClick={() => removeVideoItem(idx)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete video"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <p className="text-xs text-ivory/50">
          All image uploads and URL changes persist to the backend database immediately.
        </p>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
          <span>Save All Media</span>
        </button>
      </div>
    </div>
  );
};

export default ImageManagement;
