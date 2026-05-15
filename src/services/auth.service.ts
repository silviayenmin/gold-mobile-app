import axiosInstance from '../utils/axios';

export const authService = {
  sendOtp: async (phoneNumber: string) => {
    // Ensure +91 prefix for the backend/db matching
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    const response = await axiosInstance.post('/login', { mobileNumber: formattedPhone });
    return response.data;
  },

  verifyOtp: async (phoneNumber: string, otp: string) => {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    const response = await axiosInstance.post('/verify-otp', { mobileNumber: formattedPhone, otpCode: otp });
    return response.data;
  },

  signUp: async (data: any) => {
    const response = await axiosInstance.post('/sign-up', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile'); // Assuming /users/profile exists based on typical Nest naming
    return response.data;
  }
};
