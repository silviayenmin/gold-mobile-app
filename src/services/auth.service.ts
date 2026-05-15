import axiosInstance from '../utils/axios';

export const authService = {
  sendOtp: async (phoneNumber: string) => {
    // return axiosInstance.post('/auth/send-otp', { phoneNumber });
    return { success: true, message: 'OTP sent successfully' };
  },

  verifyOtp: async (phoneNumber: string, otp: string) => {
    // return axiosInstance.post('/auth/verify-otp', { phoneNumber, otp });
    return { 
      success: true, 
      token: 'mock-jwt-token',
      user: {
        id: '1',
        name: 'John Doe',
        phoneNumber,
        isKycVerified: false
      }
    };
  },

  getProfile: async () => {
    // return axiosInstance.get('/auth/profile');
    return { id: '1', name: 'John Doe', isKycVerified: false };
  }
};
