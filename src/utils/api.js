const API_BASE_URL = import.meta.env?.VITE_API_URL || 
                     (typeof process !== 'undefined' && process.env?.VITE_API_URL) || 
                     'http://localhost:5000/api';

const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const enquiryAPI = {
  submit: async (enquiryData) => {
    return apiCall('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    });
  },

  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.service) queryParams.append('service', filters.service);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/enquiries?${queryString}` : '/enquiries';
    
    return apiCall(endpoint);
  },

  updateStatus: async (enquiryId, status) => {
    return apiCall(`/enquiries/${enquiryId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (enquiryId) => {
    return apiCall(`/enquiries/${enquiryId}`, {
      method: 'DELETE',
    });
  },
};

export const healthCheck = async () => {
  return apiCall('/health');
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.message.includes('500')) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'Something went wrong. Please try again.';
};

export const validateEnquiryForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.service) {
    errors.service = 'Please select a service';
  }

  if (!formData.message?.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

export default { enquiryAPI, healthCheck, handleApiError, validateEnquiryForm, storage };