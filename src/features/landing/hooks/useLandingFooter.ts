import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LandingFooterService } from '../services/landingFooterService';
import type { LandingFooterConfig } from '../types/landingFooter';

export const useLandingFooterQuery = () => {
  return useQuery<LandingFooterConfig, Error>({
    queryKey: ['landingFooter'],
    queryFn: LandingFooterService.getFooterConfig,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

export const useUpdateLandingFooterMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LandingFooterConfig, Error, Partial<LandingFooterConfig>>({
    mutationFn: LandingFooterService.updateFooterConfig,
    onSuccess: (data) => {
      queryClient.setQueryData(['landingFooter'], data);
      queryClient.invalidateQueries({ queryKey: ['landingFooter'] });
    },
  });
};
