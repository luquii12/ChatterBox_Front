import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';
import { use } from 'react';

const user = JSON.parse(localStorage.getItem("user")); // o sessionStorage si usas eso

const instance = axios.create({
    baseURL: "https://chatterbox-production-a64a.up.railway.app",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token??""}`,

    },
});
export const multipartInstance = axios.create({
  baseURL: "https://chatterbox-production-a64a.up.railway.app",
  headers: {
    Authorization: `Bearer ${user?.token??""}`,
  },
});


instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); // ⚠️ Leer directamente de localStorage
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default instance;