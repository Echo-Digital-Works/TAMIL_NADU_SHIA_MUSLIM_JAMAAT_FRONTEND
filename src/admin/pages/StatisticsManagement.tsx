import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import adminApi from '../services/adminApi';
import { useSiteData } from '../../context/SiteDataContext';

export const StatisticsManagement: React.FC = () => {
  const { refreshData } = useSiteData();
  const [statistics, setStatistics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getStatistics();
      setStatistics(res.data || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await adminApi.updateStatistics(statistics);
      setStatistics(res.data);
      setSuccessMessage('Statistics and impact metrics updated successfully in the backend database!');
      await refreshData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update statistics');
    } finally {
      setSaving(false);
    }
  };

  const addStat = () => {
    const newStat = {
      id: `stat-${Date.now()}`,
      value: '100',
      label: 'New Community Metric',
      suffix: '+',
    };
    setStatistics([...statistics, newStat]);
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updated = [...statistics];
    updated[index] = { ...updated[index], [field]: value };
    setStatistics(updated);
  };

  const removeStat = (index: number) => {
    setStatistics(statistics.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Loading metrics from backend database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            Participant & Impact Statistics
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Update metrics and counts shown on the public Impact section in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addStat}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
          >
            <Plus size={16} />
            <span>Add Statistic</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            <span>Save Metrics</span>
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

      {/* Grid of editable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statistics.map((stat, idx) => (
          <div
            key={stat.id || idx}
            className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 relative group hover:border-gold/30 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase font-bold text-gold px-2 py-0.5 rounded bg-gold/10">
                  Item #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeStat(idx)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Metric"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Metric Value / Count
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(idx, 'value', e.target.value)}
                  placeholder="e.g. 2,000 or ₹5,00,000"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-lg font-bold text-gold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Label / Description
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(idx, 'label', e.target.value)}
                  placeholder="e.g. People Served"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Suffix (optional)
                </label>
                <input
                  type="text"
                  value={stat.suffix || ''}
                  onChange={(e) => updateStat(idx, 'suffix', e.target.value)}
                  placeholder="e.g. + or %"
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory/80 focus:outline-none focus:border-gold font-mono"
                />
              </div>
            </div>

            {/* Live Preview Badge */}
            <div className="mt-6 pt-4 border-t border-white/5 text-center bg-midnight/50 rounded-xl p-3">
              <p className="font-serif text-2xl font-bold text-gold">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-xs text-ivory/70 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsManagement;
