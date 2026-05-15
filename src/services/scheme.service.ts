import axiosInstance from '../utils/axios';
import { MOCK_AVAILABLE_SCHEMES, MOCK_ACTIVE_SCHEMES } from '../constants/mockData';

export const schemeService = {
  getAvailableSchemes: async () => {
    // return axiosInstance.get('/schemes/available');
    return MOCK_AVAILABLE_SCHEMES;
  },

  getActiveSchemes: async () => {
    // return axiosInstance.get('/schemes/active');
    return MOCK_ACTIVE_SCHEMES;
  },

  joinScheme: async (schemeId: string, kycData: any) => {
    // return axiosInstance.post(`/schemes/join/${schemeId}`, kycData);
    return { success: true, enrollmentId: 'ENR-' + Math.random().toString(36).substr(2, 9) };
  }
};
