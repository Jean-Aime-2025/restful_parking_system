import { getCookie } from '@/utils/cookie';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});


// what is the use of this???????
api.interceptors.request.use((config) => {
  const token = getCookie('auth_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;