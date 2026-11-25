import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.data && response.data.data.token) {
      localStorage.setItem('urban_spoon_admin_token', response.data.data.token);
      localStorage.setItem('urban_spoon_admin_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('urban_spoon_admin_token');
    localStorage.removeItem('urban_spoon_admin_user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('urban_spoon_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('urban_spoon_admin_token');
  },
};
