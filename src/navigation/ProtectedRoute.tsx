import React from "react";
import { useAuthStore } from "@/store/slices/auth.slice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return null; // Navigation logic handles redirection
  }

  return <>{children}</>;
};
