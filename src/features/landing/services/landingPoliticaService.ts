import { ApiService } from '../../../shared/services/apiService';
import type { LandingPoliticaConfig } from '../types/landingPolitica';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const LandingPoliticaService = {
  getPoliticaConfig: async (): Promise<LandingPoliticaConfig> => {
    const response = await ApiService.get<ApiResponse<LandingPoliticaConfig>>('/landing-politica');
    return response.data || (response as any);
  },

  updatePoliticaConfig: async (payload: Partial<LandingPoliticaConfig>): Promise<LandingPoliticaConfig> => {
    const response = await ApiService.patch<ApiResponse<LandingPoliticaConfig>>('/landing-politica', payload);
    return response.data || (response as any);
  },
};

export default LandingPoliticaService;
