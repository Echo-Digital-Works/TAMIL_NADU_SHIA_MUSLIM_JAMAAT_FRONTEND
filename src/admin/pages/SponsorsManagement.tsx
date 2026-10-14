import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Award, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import adminApi from '../services/adminApi';
import ImageUploader from '../components/ImageUploader';
import { useSiteData } from '../../context/SiteDataContext';

export const SponsorsManagement: React.FC = () => {
  const { refreshData } = useSiteData();
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSponsors();
      setSponsors(res.data || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load sponsors');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await adminApi.updateSponsors(sponsors);
      setSponsors(res.data);
      setSuccessMessage('Sponsors and community partners updated successfully!');
      await refreshData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save sponsors');
    } finally {
      setSaving(false);
    }
  };

  const addSponsor = () => {
    const newSponsor = {
      id: `sp-${Date.now()}`,
      name: 'New Community Partner',
      type: 'Supporting Partner',
      description: 'Support and collaboration for community initiatives.',
      logoUrl: '',
      website: 'https://example.org',
    };
    setSponsors([...sponsors, newSponsor]);
  };

  const updateSponsor = (index: number, field: string, value: string) => {
    const updated = [...sponsors];
    updated[index] = { ...updated[index], [field]: value };
    setSponsors(updated);
  };

  const removeSponsor = (index: number) => {
    setSponsors(sponsors.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Loading sponsors...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            Sponsors & Community Partners
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Manage partner trusts, philanthropic organizations, and donor associations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addSponsor}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
          >
            <Plus size={16} />
            <span>Add Partner</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            <span>Save Partners</span>
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

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 relative group hover:border-gold/30 transition-all shadow-lg flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono uppercase font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 flex items-center gap-1">
                  <Award size={13} />
                  <span>Partner #{idx + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeSponsor(idx)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Partner / Trust Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateSponsor(idx, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Partnership Category / Role
                </label>
                <input
                  type="text"
                  value={item.type}
                  onChange={(e) => updateSponsor(idx, 'type', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory/80 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => updateSponsor(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Website / Contact Link
                </label>
                <input
                  type="text"
                  value={item.website || ''}
                  onChange={(e) => updateSponsor(idx, 'website', e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory/70 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <ImageUploader
                  label="Partner Logo"
                  helperText="Upload logo (PNG/SVG)"
                  currentImageUrl={item.logoUrl}
                  onImageUploaded={(url) => updateSponsor(idx, 'logoUrl', url)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsManagement;
