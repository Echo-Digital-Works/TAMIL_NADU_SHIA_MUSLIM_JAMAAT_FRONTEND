import React, { createContext, useContext, useState, useEffect } from 'react';
import adminApi from '../services/adminApi';

interface AdminUser {
  username: string;
  role: string;
  displayName?: string;
}

interface AdminAuthContextType {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('admin_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await adminApi.getMe();
        if (res.user) {
          setUser(res.user);
          localStorage.setItem('admin_user', JSON.stringify(res.user));
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    const res = await adminApi.login(credentials);
    if (res.token && res.user) {
      localStorage.setItem('admin_token', res.token);
      localStorage.setItem('admin_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    } else {
      throw new Error(res.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
