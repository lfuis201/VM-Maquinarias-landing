import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LandingRestauranteService } from '../services/landingRestauranteService';
import type { LandingRestauranteConfig } from '../types/landingRestaurante';

export const useLandingRestauranteQuery = () => {
  return useQuery<LandingRestauranteConfig, Error>({
    queryKey: ['landingRestaurante'],
    queryFn: LandingRestauranteService.getRestauranteConfig,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

export const useUpdateLandingRestauranteMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LandingRestauranteConfig, Error, Partial<LandingRestauranteConfig>>({
    mutationFn: LandingRestauranteService.updateRestauranteConfig,
    onSuccess: (data) => {
      queryClient.setQueryData(['landingRestaurante'], data);
      queryClient.invalidateQueries({ queryKey: ['landingRestaurante'] });
    },
  });
};
