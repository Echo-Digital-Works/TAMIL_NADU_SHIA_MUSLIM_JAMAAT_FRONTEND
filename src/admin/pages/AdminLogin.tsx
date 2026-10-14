import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
    const params = new URLSearchParams(location.search);
    if (params.get('expired')) {
      setErrorMessage('Your administrative session has expired. Please log in again.');
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage('Please provide both username and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await login({ username: username.trim(), password });
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] flex items-center justify-center p-4 relative overflow-hidden text-ivory">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-midnight/80 to-[#07090F] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-[#0E121B]/90 backdrop-blur-xl border border-gold/25 rounded-3xl p-8 shadow-2xl shadow-black/80">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/40 flex items-center justify-center text-gold shadow-lg shadow-gold/20">
              <ShieldCheck size={36} />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-ivory to-gold tracking-wide">
              Administrator Login
            </h1>
            <p className="text-xs text-ivory/60 mt-1 uppercase tracking-widest font-sans">
              Tamil Nadu Shia Muslim Jamaat
            </p>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                Admin Mobile / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ivory/40">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="9566016668 or admin"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-midnight/80 border border-white/10 rounded-xl text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ivory/40">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrative password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-midnight/80 border border-white/10 rounded-xl text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ivory/40 hover:text-ivory transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold to-[#B38F3F] hover:from-[#E2C376] hover:to-gold text-midnight font-bold text-sm tracking-wide shadow-lg shadow-gold/20 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 mt-4 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <span>Access Admin Portal</span>
              )}
            </button>
          </form>

          {/* Authentic Website Credentials Selector */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
            <p className="text-xs text-ivory/60">
              Tamil Nadu Shia Muslim Jamaat Administrative Access:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setUsername('9566016668');
                  setPassword('9566016668');
                }}
                className="w-full sm:w-auto text-[11px] font-mono px-3.5 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <span>Website Contact: <strong>9566016668</strong></span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('Admin@12345');
                }}
                className="w-full sm:w-auto text-[11px] font-mono px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-ivory/70 border border-white/10 transition-all flex items-center justify-center cursor-pointer hover:scale-[1.02]"
              >
                <span>Master Admin: <strong>admin</strong></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
