import { ApiService } from '../../../shared/services/apiService';
import type { LandingHomeConfig } from '../types/landingHome';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const LandingHomeService = {
  getHomeConfig: async (): Promise<LandingHomeConfig> => {
    const response = await ApiService.get<ApiResponse<LandingHomeConfig>>('/landing-home');
    return response.data || (response as any);
  },

  updateHomeConfig: async (payload: Partial<LandingHomeConfig>): Promise<LandingHomeConfig> => {
    const response = await ApiService.patch<ApiResponse<LandingHomeConfig>>('/landing-home', payload);
    return response.data || (response as any);
  },
};

export default LandingHomeService;
