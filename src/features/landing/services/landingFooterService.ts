import { ApiService } from '../../../shared/services/apiService';
import type { LandingFooterConfig } from '../types/landingFooter';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const LandingFooterService = {
  getFooterConfig: async (): Promise<LandingFooterConfig> => {
    const response = await ApiService.get<ApiResponse<LandingFooterConfig>>('/landing-footer');
    return response.data || (response as any);
  },

  updateFooterConfig: async (payload: Partial<LandingFooterConfig>): Promise<LandingFooterConfig> => {
    const response = await ApiService.patch<ApiResponse<LandingFooterConfig>>('/landing-footer', payload);
    return response.data || (response as any);
  },
};

export default LandingFooterService;
