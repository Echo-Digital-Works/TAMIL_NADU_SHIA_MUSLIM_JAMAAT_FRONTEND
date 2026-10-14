import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Calendar, MapPin, Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import adminApi from '../services/adminApi';
import { useSiteData } from '../../context/SiteDataContext';

export const EventManagement: React.FC = () => {
  const { refreshData } = useSiteData();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getEvents();
      setEvents(res.data || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await adminApi.updateEvents(events);
      setEvents(res.data);
      setSuccessMessage('Events updated successfully in backend database!');
      await refreshData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save events');
    } finally {
      setSaving(false);
    }
  };

  const addEvent = () => {
    const newEvent = {
      id: `ev-${Date.now()}`,
      title: 'New Community Gathering',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM - 01:00 PM',
      venue: 'Chennai Community Hall',
      description: 'Event agenda and program details.',
      status: 'Upcoming',
      badge: 'Community',
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (index: number, field: string, value: string) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setEvents(updated);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="animate-spin text-gold" size={32} />
        <p className="text-sm text-ivory/60">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            Event Details Management
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Schedule assemblies, educational programs, and conference details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addEvent}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
          >
            <Plus size={16} />
            <span>Add Event</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-midnight font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            <span>Save Events</span>
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

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event, idx) => (
          <div
            key={event.id || idx}
            className="bg-[#0E121B] border border-white/10 rounded-2xl p-6 relative group hover:border-gold/30 transition-all shadow-lg"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10">
                  Event #{idx + 1}
                </span>
                <input
                  type="text"
                  value={event.badge || ''}
                  onChange={(e) => updateEvent(idx, 'badge', e.target.value)}
                  placeholder="Category Badge"
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-ivory/80 focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="button"
                onClick={() => removeEvent(idx)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Remove Event"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => updateEvent(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Venue Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ivory/40">
                    <MapPin size={15} />
                  </div>
                  <input
                    type="text"
                    value={event.venue}
                    onChange={(e) => updateEvent(idx, 'venue', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ivory/40">
                    <Calendar size={15} />
                  </div>
                  <input
                    type="date"
                    value={event.date}
                    onChange={(e) => updateEvent(idx, 'date', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                  Time / Schedule
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ivory/40">
                    <Clock size={15} />
                  </div>
                  <input
                    type="text"
                    value={event.time}
                    onChange={(e) => updateEvent(idx, 'time', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/60 mb-1">
                Description & Agenda
              </label>
              <textarea
                rows={2}
                value={event.description}
                onChange={(e) => updateEvent(idx, 'description', e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;
