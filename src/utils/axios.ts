import axios from 'axios';
import { APP_CONFIG, STORAGE_KEYS } from '../constants/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, token ? 'Token found' : 'No token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(`[Axios Response Error] ${error.config?.url} status: ${error.response?.status}`, error.response?.data);
    if (error.response?.status === 401) {
      // Handle logout or refresh token
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
