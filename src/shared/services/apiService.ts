import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiInstance from './axiosInstance';

// ApiService wrapping axios calls
export const ApiService = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.get(url, config);
    return response.data;
  },

  post: async <T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.post(url, data, config);
    return response.data;
  },

  put: async <T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.put(url, data, config);
    return response.data;
  },

  patch: async <T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.patch(url, data, config);
    return response.data;
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.delete(url, config);
    return response.data;
  },
};

export default ApiService;
