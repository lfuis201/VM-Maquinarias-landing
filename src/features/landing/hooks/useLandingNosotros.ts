import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LandingNosotrosService } from '../services/landingNosotrosService';
import type { LandingNosotrosConfig } from '../types/landingNosotros';

export const useLandingNosotrosQuery = () => {
  return useQuery<LandingNosotrosConfig, Error>({
    queryKey: ['landingNosotros'],
    queryFn: LandingNosotrosService.getNosotrosConfig,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

export const useUpdateLandingNosotrosMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LandingNosotrosConfig, Error, Partial<LandingNosotrosConfig>>({
    mutationFn: LandingNosotrosService.updateNosotrosConfig,
    onSuccess: (data) => {
      queryClient.setQueryData(['landingNosotros'], data);
      queryClient.invalidateQueries({ queryKey: ['landingNosotros'] });
    },
  });
};
