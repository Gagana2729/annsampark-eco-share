import api from './api';

// Authentication services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },
};

// Donation services
export const donationService = {
  createDonation: async (formData) => {
    const response = await api.post('/donations', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getAllDonations: async () => {
    const response = await api.get('/donations');
    return response.data;
  },

  getDonations: async (filters = {}) => {
    const response = await api.get('/donations', { params: filters });
    return response.data;
  },

  getDonation: async (id) => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },

  getMyDonations: async () => {
    const response = await api.get('/donations/my/donations');
    return response.data;
  },

  updateDonation: async (id, donationData) => {
    const response = await api.put(`/donations/${id}`, donationData);
    return response.data;
  },

  deleteDonation: async (id) => {
    const response = await api.delete(`/donations/${id}`);
    return response.data;
  },

  claimDonation: async (id) => {
    const response = await api.post(`/donations/${id}/claim`);
    return response.data;
  },

  completeDonation: async (id) => {
    const response = await api.put(`/donations/${id}/complete`);
    return response.data;
  },
};

// User services
export const userService = {
  getUserProfile: async (id) => {
    const response = await api.get(`/users/profile/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  getAllUsers: async (filters = {}) => {
    const response = await api.get('/users', { params: filters });
    return response.data;
  },

  verifyUser: async (id) => {
    const response = await api.put(`/users/verify/${id}`);
    return response.data;
  },
};

// Notification services
export const notificationService = {
  getNotifications: async (filters = {}) => {
    const response = await api.get('/notifications', { params: filters });
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};

// EXPORT EVERYTHING (IMPORTANT)
export default {
  authService,
  donationService,
  userService,
  notificationService,
  api,
};
