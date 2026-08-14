import { ApiService } from '../../../shared/services/apiService';
import type { Blog } from '../types/blog';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const BlogService = {
  getAll: async (): Promise<Blog[]> => {
    const response = await ApiService.get<ApiResponse<Blog[]> | Blog[]>('/blogs');
    return (response as any).data || response;
  },

  getById: async (id: number): Promise<Blog> => {
    const response = await ApiService.get<ApiResponse<Blog> | Blog>(`/blogs/${id}`);
    return (response as any).data || response;
  },

  create: async (payload: Partial<Blog>): Promise<Blog> => {
    const response = await ApiService.post<ApiResponse<Blog> | Blog>('/blogs', payload);
    return (response as any).data || response;
  },

  update: async (id: number, payload: Partial<Blog>): Promise<Blog> => {
    const response = await ApiService.patch<ApiResponse<Blog> | Blog>(`/blogs/${id}`, payload);
    return (response as any).data || response;
  },

  remove: async (id: number): Promise<void> => {
    await ApiService.delete(`/blogs/${id}`);
  },
};

export default BlogService;
