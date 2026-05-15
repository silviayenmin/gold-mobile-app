export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  isKycVerified: boolean;
  profileImage?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
