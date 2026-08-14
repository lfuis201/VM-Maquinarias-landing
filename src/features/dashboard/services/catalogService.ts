import { ApiService } from '../../../shared/services/apiService';
import type { Product } from '../types/catalog';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const CatalogService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await ApiService.get<ApiResponse<Product[]>>('/products');
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await ApiService.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  createProduct: async (product: Omit<Product, 'id'> | FormData): Promise<Product> => {
    const config = product instanceof FormData ? {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } : undefined;
    const response = await ApiService.post<ApiResponse<Product>>('/products', product, config);
    return response.data;
  },

  updateProduct: async (id: string, product: Partial<Product> | FormData): Promise<Product> => {
    const config = product instanceof FormData ? {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } : undefined;
    const response = await ApiService.patch<ApiResponse<Product>>(`/products/${id}`, product, config);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await ApiService.delete(`/products/${id}`);
  },
};

export default CatalogService;
