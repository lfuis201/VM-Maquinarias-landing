import { ApiService } from '../../../shared/services/apiService';
import type { LandingRestauranteConfig } from '../types/landingRestaurante';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const LandingRestauranteService = {
  getRestauranteConfig: async (): Promise<LandingRestauranteConfig> => {
    const response = await ApiService.get<ApiResponse<LandingRestauranteConfig>>('/landing-restaurante');
    return response.data || (response as any);
  },

  updateRestauranteConfig: async (payload: Partial<LandingRestauranteConfig>): Promise<LandingRestauranteConfig> => {
    const response = await ApiService.patch<ApiResponse<LandingRestauranteConfig>>('/landing-restaurante', payload);
    return response.data || (response as any);
  },
};

export default LandingRestauranteService;
