const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const SERVER_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

const getHeaders = (hasBody = true, isMultipart = false): HeadersInit => {
  const headers: Record<string, string> = {};
  if (hasBody && !isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res: Response) => {
  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    if (!window.location.pathname.includes('/admin/login')) {
      window.location.href = '/admin/login?expired=true';
    }
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = json.message || json.error?.message || `HTTP error! status: ${res.status}`;
    throw new Error(errorMsg);
  }
  return json;
};

export const adminApi = {
  // Authentication
  login: async (credentials: { username: string; password: string }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  // Branding & Logo
  getBranding: async () => {
    const res = await fetch(`${API_BASE}/branding`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateBranding: async (data: any) => {
    const res = await fetch(`${API_BASE}/branding`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Website Content
  getContent: async () => {
    const res = await fetch(`${API_BASE}/content`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateContent: async (contentData: any) => {
    const res = await fetch(`${API_BASE}/content`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(contentData),
    });
    return handleResponse(res);
  },

  // Objectives (Mission)
  getObjectives: async () => {
    const res = await fetch(`${API_BASE}/objectives`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateObjectives: async (data: any[]) => {
    const res = await fetch(`${API_BASE}/objectives`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Office Bearers & Founders
  getFounders: async () => {
    const res = await fetch(`${API_BASE}/founders`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateFounders: async (data: any[]) => {
    const res = await fetch(`${API_BASE}/founders`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Mosque Guide Directory
  getMosqueGuide: async () => {
    const res = await fetch(`${API_BASE}/mosque-guide`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateMosqueGuide: async (data: any[]) => {
    const res = await fetch(`${API_BASE}/mosque-guide`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Videos
  getVideos: async () => {
    const res = await fetch(`${API_BASE}/videos`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateVideos: async (data: any[]) => {
    const res = await fetch(`${API_BASE}/videos`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Images & Media
  getImages: async () => {
    const res = await fetch(`${API_BASE}/images`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateImages: async (imagesData: any) => {
    const res = await fetch(`${API_BASE}/images`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(imagesData),
    });
    return handleResponse(res);
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/images/upload`, {
      method: 'POST',
      headers: getHeaders(true, true),
      body: formData,
    });
    return handleResponse(res);
  },

  // Statistics
  getStatistics: async () => {
    const res = await fetch(`${API_BASE}/statistics`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateStatistics: async (statisticsData: any[]) => {
    const res = await fetch(`${API_BASE}/statistics`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(statisticsData),
    });
    return handleResponse(res);
  },

  // Activities & Timeline
  getActivities: async () => {
    const res = await fetch(`${API_BASE}/activities`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateActivities: async (activitiesData: any[]) => {
    const res = await fetch(`${API_BASE}/activities`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(activitiesData),
    });
    return handleResponse(res);
  },

  // Events
  getEvents: async () => {
    const res = await fetch(`${API_BASE}/events`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateEvents: async (eventsData: any[]) => {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(eventsData),
    });
    return handleResponse(res);
  },

  // Tracks & Pillars
  getTracks: async () => {
    const res = await fetch(`${API_BASE}/tracks`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateTracks: async (tracksData: any[]) => {
    const res = await fetch(`${API_BASE}/tracks`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(tracksData),
    });
    return handleResponse(res);
  },

  // Sponsors & Partners
  getSponsors: async () => {
    const res = await fetch(`${API_BASE}/sponsors`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateSponsors: async (sponsorsData: any[]) => {
    const res = await fetch(`${API_BASE}/sponsors`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(sponsorsData),
    });
    return handleResponse(res);
  },

  // Announcements
  getAnnouncements: async () => {
    const res = await fetch(`${API_BASE}/announcements`, {
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  updateAnnouncements: async (announcementsData: any[]) => {
    const res = await fetch(`${API_BASE}/announcements`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(announcementsData),
    });
    return handleResponse(res);
  },

  // URL Helper
  resolveImageUrl: (urlPath: string): string => {
    if (!urlPath) return '';
    if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) return urlPath;
    if (urlPath.startsWith('/uploads')) return `${SERVER_BASE}${urlPath}`;
    if (!urlPath.startsWith('/')) return `/${urlPath}`;
    return urlPath;
  },
};

export default adminApi;
