import { ApiService } from '../../../shared/services/apiService';
import type { LandingPlan } from '../types/landingPlan';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const LandingPlansService = {
  getAll: async (): Promise<LandingPlan[]> => {
    const response = await ApiService.get<ApiResponse<LandingPlan[]>>('/landing-plans');
    return response.data || (response as any);
  },

  create: async (payload: Partial<LandingPlan>): Promise<LandingPlan> => {
    const response = await ApiService.post<ApiResponse<LandingPlan>>('/landing-plans', payload);
    return response.data || (response as any);
  },

  update: async (id: number, payload: Partial<LandingPlan>): Promise<LandingPlan> => {
    const response = await ApiService.patch<ApiResponse<LandingPlan>>(`/landing-plans/${id}`, payload);
    return response.data || (response as any);
  },

  remove: async (id: number): Promise<void> => {
    await ApiService.delete(`/landing-plans/${id}`);
  },
};

export default LandingPlansService;
