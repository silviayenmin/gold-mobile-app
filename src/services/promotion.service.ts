import axiosInstance from '../utils/axios';

export const promotionService = {
  getBanners: async () => {
    const response = await axiosInstance.get('/promotions/banners');
    return response.data;
  },

  getOffers: async () => {
    const response = await axiosInstance.get('/promotions/offers');
    return response.data;
  },

  getOfferDetails: async (id: number) => {
    const response = await axiosInstance.get(`/promotions/${id}`);
    return response.data;
  }
};
