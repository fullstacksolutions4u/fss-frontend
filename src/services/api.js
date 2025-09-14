import axios from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TokenManager = {
  getToken: () => localStorage.getItem('authToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setToken: (token) => localStorage.setItem('authToken', token),
  setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
  removeTokens: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = TokenManager.getToken();
    
    if (token && !config.url.includes('/auth/login') && !config.url.includes('/auth/setup')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error(`❌ API Error: ${error.response?.status} ${originalRequest?.url}`, error.response?.data);
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = TokenManager.getRefreshToken();
      
      if (refreshToken && !TokenManager.isTokenExpired(refreshToken)) {
        try {
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken
          });
          
          if (refreshResponse.data.accessToken) {
            TokenManager.setToken(refreshResponse.data.accessToken);
            
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          TokenManager.removeTokens();
          
          if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
          }
        }
      } else {
        TokenManager.removeTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login';
        }
      }
    }
    
    const errorResponse = {
      type: 'API_ERROR',
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'An error occurred',
      data: error.response?.data
    };
    
    if (error.response?.status === 400 && error.response?.data?.errors) {
      const validationErrors = {};
      error.response.data.errors.forEach(err => {
        validationErrors[err.field] = err.message;
      });
      
      errorResponse.type = 'VALIDATION_ERROR';
      errorResponse.validationErrors = validationErrors;
    }
    
    if (!error.response) {
      errorResponse.type = 'NETWORK_ERROR';
      errorResponse.message = 'Network error occurred. Please check your connection.';
    }
    
    return Promise.reject(errorResponse);
  }
);

export const enquiryAPI = {
  create: async (enquiryData) => {
    return apiClient.post('/enquiries', enquiryData);
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/enquiries${queryString ? `?${queryString}` : ''}`;
    return apiClient.get(endpoint);
  },

  getById: async (id) => {
    return apiClient.get(`/enquiries/${id}`);
  },

  updateStatus: async (id, status, reason) => {
    return apiClient.patch(`/enquiries/${id}/status`, { status, reason });
  },

  addNote: async (id, note, isPrivate = false) => {
    return apiClient.post(`/enquiries/${id}/notes`, { note, isPrivate });
  },

  getStats: async () => {
    return apiClient.get('/enquiries/stats');
  },

  delete: async (id) => {
    return apiClient.delete(`/enquiries/${id}`);
  },
};

export const authAPI = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    
    if (response.data?.accessToken) {
      TokenManager.setToken(response.data.accessToken);
    }
    if (response.data?.refreshToken) {
      TokenManager.setRefreshToken(response.data.refreshToken);
    }
    if (response.data?.admin) {
      localStorage.setItem('user', JSON.stringify(response.data.admin));
    }
    
    return response;
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      TokenManager.removeTokens();
    }
  },

  getProfile: async () => {
    return apiClient.get('/auth/profile');
  },

  refreshToken: async () => {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    
    if (response.data?.accessToken) {
      TokenManager.setToken(response.data.accessToken);
    }
    
    return response;
  },

  createAdmin: async (adminData) => {
    return apiClient.post('/auth/setup', adminData);
  },
};

export const dashboardAPI = {
  getOverview: async () => {
    return apiClient.get('/dashboard/overview');
  },

  getAnalytics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/dashboard/analytics${queryString ? `?${queryString}` : ''}`;
    return apiClient.get(endpoint);
  },

  getPerformance: async () => {
    return apiClient.get('/dashboard/performance');
  },

  exportEnquiries: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/dashboard/export${queryString ? `?${queryString}` : ''}`;
    return apiClient.get(endpoint);
  },
};

export const emailAPI = {
  getStatus: async () => {
    return apiClient.get('/emails/status');
  },

  testEmail: async (testEmail) => {
    return apiClient.post('/emails/test', { testEmail });
  },

  sendCustomEmail: async (emailData) => {
    return apiClient.post('/emails/custom', emailData);
  },

  sendFollowUpReminders: async () => {
    return apiClient.post('/emails/follow-up-reminders');
  },

  sendWeeklyReport: async () => {
    return apiClient.post('/emails/weekly-report');
  },
};

export const systemAPI = {
  healthCheck: async () => {
    return apiClient.get('/health');
  },
};

export { TokenManager };

const api = {
  enquiry: enquiryAPI,
  auth: authAPI,
  dashboard: dashboardAPI,
  email: emailAPI,
  system: systemAPI,
  TokenManager
};

export default api;