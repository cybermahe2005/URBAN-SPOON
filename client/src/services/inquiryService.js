import api from './api';

export const inquiryService = {
  // Public: Submit table inquiry
  submitInquiry: async (data) => {
    const response = await api.post('/inquiries', data);
    return response.data;
  },

  // Public: Check inquiry status by Reference ID and Phone Number
  checkStatus: async (referenceId, phoneNumber) => {
    const response = await api.post('/inquiries/check-status', {
      referenceId,
      phoneNumber,
    });
    return response.data;
  },

  // Admin: Get all inquiries with optional status, search, date filter, pagination
  getInquiries: async (params = {}) => {
    const response = await api.get('/inquiries', { params });
    return response.data;
  },

  // Admin: Get inquiry summary stats
  getStats: async () => {
    const response = await api.get('/inquiries/stats/summary');
    return response.data;
  },

  // Admin: Get single inquiry
  getInquiryById: async (id) => {
    const response = await api.get(`/inquiries/${id}`);
    return response.data;
  },

  // Admin: Update inquiry status (Pending, Confirmed, Cancelled)
  updateStatus: async (id, status) => {
    const response = await api.patch(`/inquiries/${id}/status`, { status });
    return response.data;
  },

  // Admin: Delete inquiry
  deleteInquiry: async (id) => {
    const response = await api.delete(`/inquiries/${id}`);
    return response.data;
  },
};
