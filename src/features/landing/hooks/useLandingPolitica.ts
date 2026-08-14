import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LandingPoliticaService } from '../services/landingPoliticaService';
import type { LandingPoliticaConfig } from '../types/landingPolitica';

export const useLandingPoliticaQuery = () => {
  return useQuery<LandingPoliticaConfig, Error>({
    queryKey: ['landingPolitica'],
    queryFn: LandingPoliticaService.getPoliticaConfig,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

export const useUpdateLandingPoliticaMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LandingPoliticaConfig, Error, Partial<LandingPoliticaConfig>>({
    mutationFn: LandingPoliticaService.updatePoliticaConfig,
    onSuccess: (data) => {
      queryClient.setQueryData(['landingPolitica'], data);
      queryClient.invalidateQueries({ queryKey: ['landingPolitica'] });
    },
  });
};
