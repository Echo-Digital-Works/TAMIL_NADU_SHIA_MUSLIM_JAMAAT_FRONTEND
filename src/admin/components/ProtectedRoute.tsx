import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center text-ivory">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-sans tracking-wide text-ivory/70">Verifying administrator authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
