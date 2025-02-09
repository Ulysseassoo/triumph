import axios from "axios";

export const apiEntities = axios.create({
  baseURL: "http://localhost:5002",
  headers: {
    "Content-Type": "application/json",
  },
});

apiEntities.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiEntities;
