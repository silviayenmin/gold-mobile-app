import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/app';

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  isKycVerified: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setKycStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async (user, token) => {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    set({ isAuthenticated: true, user, token });
  },
  logout: async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    set({ isAuthenticated: false, user: null, token: null });
  },
  setKycStatus: (status) => 
    set((state) => ({ 
      user: state.user ? { ...state.user, isKycVerified: status } : null 
    })),
}));
