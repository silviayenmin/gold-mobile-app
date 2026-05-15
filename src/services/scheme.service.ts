import axiosInstance from '../utils/axios';
import { MOCK_AVAILABLE_SCHEMES, MOCK_ACTIVE_SCHEMES } from '../constants/mockData';

export const schemeService = {
  getSchemes: async () => {
    const response = await axiosInstance.get('/schemes?isActive=1');
    return response.data;
  },

  getActiveSchemes: async () => {
    const response = await axiosInstance.get('/my-schemes'); // Matches BE controller
    return response.data;
  },

  getOneActiveScheme: async (id: number) => {
    const response = await axiosInstance.get(`/my-schemes/${id}`);
    return response.data.data || response.data;
  },

  joinScheme: async (schemeId: string, kycData: any) => {
    const response = await axiosInstance.post('/join-scheme', { schemeId, ...kycData });
    return response.data;
  },

  getPendingDues: async (customerSchemeId: number) => {
    const response = await axiosInstance.get(`/pending-dues?customerSchemeId=${customerSchemeId}`);
    return response.data;
  }
};
