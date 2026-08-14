import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useAuthStore } from '../../features/dashboard/stores/authStore';

const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:3000/api/v1'
  : '/api/v1';

// Create the axios instance
export const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor to automatically attach authorization token
apiInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token || localStorage.getItem('adminToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for unified error formatting or redirection on unauthorized
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, we could clear token or let the caller handle it
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
