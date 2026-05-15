export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || "https://api.goldapp.com/v1",
  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/admin/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },
  CUSTOMERS: {
    BASE: "/customers",
    DETAILS: (id: string) => `/customers/${id}`,
    SCHEMES: (id: string) => `/customers/${id}/schemes`,
  },
  SCHEMES: {
    BASE: "/schemes",
    ACTIVATE: (id: string) => `/schemes/${id}/activate`,
    DEACTIVATE: (id: string) => `/schemes/${id}/deactivate`,
  },
  PAYMENTS: {
    BASE: "/payments",
    HISTORY: "/payments/history",
  },
  INSTALLMENTS: {
    DUE: "/installments/due",
    COLLECT: "/installments/collect",
  },
  BANNERS: {
    BASE: "/banners",
  },
};
