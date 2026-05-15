import axiosInstance from '../utils/axios';

export const paymentService = {
  createPayment: async (data: { customerSchemeId: number; installmentId: number; amount: number; paymentMethod: string }) => {
    const response = await axiosInstance.post('/create-payment', data);
    return response.data;
  },

  getPaymentHistory: async (search?: string, status?: string) => {
    const response = await axiosInstance.get('/payment-history', {
      params: { search, status }
    });
    return response.data;
  }
};
