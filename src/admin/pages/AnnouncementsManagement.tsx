import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Bell, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import adminApi from '../services/adminApi';
import { useSiteData } from '../../context/SiteDataContext';

export const AnnouncementsManagement: React.FC = () => {
  const { refreshData } = useSiteData();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAnnouncements();
      setAnnouncements(res.data || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await adminApi.updateAnnouncements(announcements);
      setAnnouncements(res.data);
      setSuccessMessage('Announcements updated successfully in backend database!');
      await refreshData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save announcements');
    } finally {
      setSaving(false);
    }
  };

  const addAnnouncement = () => {
    const newAnnouncement = {
      id: `an-${Date.now()}`,
      title: 'New Community Notification',
      date: new Date().toISOString().split('T')[0],
      content: 'Important community notification text for members and visitors.',
      priority: 'medium',
      active: true,
    };
    setAnnouncements([...announcements, newAnnouncement]);
  };

  const updateAnnouncement = (index: number, field: string, value: any) => {
    const updated = [...announcements];
    updated[index] = { ...updated[index], [field]: value };
    setAnnouncements(updated);
  };

  const removeAnnouncement = (index: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Loading announcements...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            Announcements & Public Notices
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Publish or archive announcements, news bulletins, and urgent community alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addAnnouncement}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
          >
            <Plus size={16} />
            <span>Add Notice</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            <span>Save Notices</span>
          </button>
        </div>
      </div>

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

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`bg-[#0E121B] border rounded-2xl p-6 relative group transition-all shadow-lg ${
              item.active ? 'border-gold/30' : 'border-white/5 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 flex items-center gap-1.5">
                  <Bell size={13} />
                  <span>Notice #{idx + 1}</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                    item.priority === 'high'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {item.priority} priority
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={(e) => updateAnnouncement(idx, 'active', e.target.checked)}
                    className="accent-gold w-4 h-4 rounded cursor-pointer"
                  />
                  <span className={item.active ? 'text-emerald-400' : 'text-ivory/40'}>
                    {item.active ? 'Active' : 'Archived'}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => removeAnnouncement(idx)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateAnnouncement(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={item.date}
                  onChange={(e) => updateAnnouncement(idx, 'date', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-ivory focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                Announcement Content
              </label>
              <textarea
                rows={3}
                value={item.content}
                onChange={(e) => updateAnnouncement(idx, 'content', e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsManagement;
