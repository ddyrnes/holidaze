import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";
import type { AuthResponse } from "../../types/api.types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.auth.login,
    credentials
  );

  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("userName", response.data.name);
    localStorage.setItem("userEmail", response.data.email);
  }

  return response;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>(API_ENDPOINTS.auth.register, data);
};

export const createApiKey = async (): Promise<{
  data: { name: string; key: string };
}> => {
  return apiClient.post<{ data: { name: string; key: string } }>(
    API_ENDPOINTS.auth.createApiKey,
    { name: "Holidaze API Key" },
    true
  );
};

export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
};
