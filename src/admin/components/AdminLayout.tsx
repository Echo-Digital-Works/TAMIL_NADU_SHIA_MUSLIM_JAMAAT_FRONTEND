import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, ShieldCheck } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-ivory flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-[#0E121B]/80 backdrop-blur-md border-b border-gold/10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-ivory/70 hover:text-ivory hover:bg-white/5 transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-ivory/60 font-medium">Production Database Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold transition-colors"
            >
              <span>Preview Site</span>
            </a>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <ShieldCheck size={16} />
              </div>
              <span className="text-xs font-semibold text-ivory/90 hidden md:inline">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
