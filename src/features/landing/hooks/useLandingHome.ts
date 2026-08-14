import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LandingHomeService } from '../services/landingHomeService';
import type { LandingHomeConfig } from '../types/landingHome';

export const useLandingHomeQuery = () => {
  return useQuery<LandingHomeConfig, Error>({
    queryKey: ['landingHome'],
    queryFn: LandingHomeService.getHomeConfig,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes since homepage customization doesn't change constantly
  });
};

export const useUpdateLandingHomeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LandingHomeConfig, Error, Partial<LandingHomeConfig>>({
    mutationFn: LandingHomeService.updateHomeConfig,
    onSuccess: (data) => {
      queryClient.setQueryData(['landingHome'], data);
      queryClient.invalidateQueries({ queryKey: ['landingHome'] });
    },
  });
};
