import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  BarChart3,
  LogOut,
  ExternalLink,
  ShieldCheck,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const websiteSections = [
  { tab: 'branding', order: '01', label: 'Navbar & Brand' },
  { tab: 'hero', order: '02', label: 'Hero Banner' },
  { tab: 'quotes', order: '03', label: 'Quran Verse' },
  { tab: 'about', order: '04', label: 'About & Milestone' },
  { tab: 'objectives', order: '05', label: 'Objectives (12)' },
  { tab: 'founders', order: '06', label: 'Office Bearers' },
  { tab: 'activities', order: '07', label: 'Timeline (12)' },
  { tab: 'humanitarian', order: '08', label: 'Humanitarian Aid' },
  { tab: 'education', order: '09', label: 'Education Support' },
  { tab: 'karbala', order: '10', label: 'Karbala Tribute' },
  { tab: 'brotherhood', order: '11', label: 'Brotherhood & Pillars' },
  { tab: 'mosqueGuide', order: '12', label: 'Mosque Guide' },
  { tab: 'finalAppeal', order: '13', label: 'Appeal & Hotlines' },
  { tab: 'footer', order: '14', label: 'Footer & Copyright' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { logout, user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sectionsExpanded, setSectionsExpanded] = useState(true);

  const activeTabParam = new URLSearchParams(location.search).get('tab') || 'branding';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#0E121B] border-r border-gold/15 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-gold shadow-lg shadow-gold/10">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-ivory tracking-wide leading-tight">
                Admin Portal
              </h2>
              <p className="text-[11px] text-gold uppercase tracking-wider font-medium">
                TN Shia Muslim Jamaat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-ivory/50 hover:text-ivory transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="px-6 py-4 mx-4 mt-4 rounded-xl bg-midnight/80 border border-white/5 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-xs text-ivory/50">Signed in as</p>
            <p className="text-sm font-semibold text-ivory truncate">{user?.username || 'Administrator'}</p>
          </div>
          <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-gold/10 text-gold border border-gold/20 rounded-md">
            {user?.role || 'Admin'}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto scrollbar-thin">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md shadow-gold/5'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </NavLink>

          {/* Website Content Section with Accordion */}
          <div className="pt-1">
            <div
              onClick={() => setSectionsExpanded(!sectionsExpanded)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith('/admin/content')
                  ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md shadow-gold/5'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText size={18} />
                <span>Website Content</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/25">
                  14
                </span>
                {sectionsExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </div>
            </div>

            {/* Sublist of 14 Ordered Sections */}
            {sectionsExpanded && (
              <div className="pl-4 pr-1 pt-1.5 pb-2 space-y-1">
                {websiteSections.map((sec) => {
                  const isCurrent =
                    location.pathname.startsWith('/admin/content') && activeTabParam === sec.tab;
                  return (
                    <NavLink
                      key={sec.tab}
                      to={`/admin/content?tab=${sec.tab}`}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                        isCurrent
                          ? 'bg-gold text-midnight font-bold shadow-sm shadow-gold/20'
                          : 'text-ivory/60 hover:text-ivory hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate">{sec.label}</span>
                      <span
                        className={`text-[10px] font-mono shrink-0 ml-1.5 ${
                          isCurrent ? 'text-midnight font-bold' : 'text-gold/70'
                        }`}
                      >
                        {sec.order}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>

          {/* Image Management */}
          <NavLink
            to="/admin/images"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md shadow-gold/5'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`
            }
          >
            <ImageIcon size={18} />
            <span>Image Management</span>
          </NavLink>

          {/* Statistics & Impact */}
          <NavLink
            to="/admin/statistics"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md shadow-gold/5'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`
            }
          >
            <BarChart3 size={18} />
            <span>Statistics & Impact</span>
          </NavLink>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gold/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-ivory/80 hover:text-gold hover:bg-white/5 border border-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={15} />
              View Live Website
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Live</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
