import axiosInstance from "./axiosInstance";

export interface AuthResponse {
  token: string;
  type: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface Profile {
  id: number;
  email: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/login", data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/register", data);
  return response.data;
};

export const getProfile = async (): Promise<Profile> => {
  const response = await axiosInstance.get<Profile>("/profile");
  return response.data;
};
