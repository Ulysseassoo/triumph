import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
  role?: string[] | string;
  clientPartnerId?: string;
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const fetchUser = async () => {
  const response = await api.get<User>(`/users/me`);
  return response.data;
};

export default api;