import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Layers, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import adminApi from '../services/adminApi';
import { useSiteData } from '../../context/SiteDataContext';

export const TracksManagement: React.FC = () => {
  const { refreshData } = useSiteData();
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTracks();
      setTracks(res.data || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load tracks');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await adminApi.updateTracks(tracks);
      setTracks(res.data);
      setSuccessMessage('Welfare tracks and problem statements saved successfully!');
      await refreshData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save tracks');
    } finally {
      setSaving(false);
    }
  };

  const addTrack = () => {
    const newTrack = {
      id: `tr-${Date.now()}`,
      name: 'New Strategic Welfare Track',
      problemStatement: 'Target challenge identified within the community.',
      initiatives: 'Planned workshops, committees, and support systems.',
      category: 'Welfare',
      leadCoordinator: 'Welfare Directorate',
    };
    setTracks([...tracks, newTrack]);
  };

  const updateTrack = (index: number, field: string, value: string) => {
    const updated = [...tracks];
    updated[index] = { ...updated[index], [field]: value };
    setTracks(updated);
  };

  const removeTrack = (index: number) => {
    setTracks(tracks.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Loading tracks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            Tracks & Problem Statements Management
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Configure welfare pillars, problem statements, and focus initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addTrack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
          >
            <Plus size={16} />
            <span>Add Track</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            <span>Save Tracks</span>
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

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracks.map((track, idx) => (
          <div
            key={track.id || idx}
            className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 relative group hover:border-gold/30 transition-all shadow-lg space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 flex items-center gap-1.5">
                  <Layers size={13} />
                  <span>Track #{idx + 1}</span>
                </span>
                <input
                  type="text"
                  value={track.category}
                  onChange={(e) => updateTrack(idx, 'category', e.target.value)}
                  placeholder="Category"
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-ivory/80 focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="button"
                onClick={() => removeTrack(idx)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Remove Track"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                Track Name / Title
              </label>
              <input
                type="text"
                value={track.name}
                onChange={(e) => updateTrack(idx, 'name', e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-ivory focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                Core Problem Statement / Objective
              </label>
              <textarea
                rows={2}
                value={track.problemStatement}
                onChange={(e) => updateTrack(idx, 'problemStatement', e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                Key Initiatives & Projects
              </label>
              <textarea
                rows={2}
                value={track.initiatives}
                onChange={(e) => updateTrack(idx, 'initiatives', e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                Lead Committee / Coordinator
              </label>
              <input
                type="text"
                value={track.leadCoordinator || ''}
                onChange={(e) => updateTrack(idx, 'leadCoordinator', e.target.value)}
                className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory/80 focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksManagement;
