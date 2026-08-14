import { ApiService } from '../../../shared/services/apiService';
import type { LandingNosotrosConfig } from '../types/landingNosotros';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const LandingNosotrosService = {
  getNosotrosConfig: async (): Promise<LandingNosotrosConfig> => {
    const response = await ApiService.get<ApiResponse<LandingNosotrosConfig>>('/landing-nosotros');
    return response.data || (response as any);
  },

  updateNosotrosConfig: async (payload: Partial<LandingNosotrosConfig>): Promise<LandingNosotrosConfig> => {
    const response = await ApiService.patch<ApiResponse<LandingNosotrosConfig>>('/landing-nosotros', payload);
    return response.data || (response as any);
  },
};

export default LandingNosotrosService;
