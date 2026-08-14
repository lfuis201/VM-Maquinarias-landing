import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LandingPlansService } from '../services/landingPlansService';
import type { LandingPlan } from '../types/landingPlan';

export const useLandingPlansQuery = () => {
  return useQuery<LandingPlan[], Error>({
    queryKey: ['landingPlans'],
    queryFn: LandingPlansService.getAll,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreatePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<LandingPlan, Error, Partial<LandingPlan>>({
    mutationFn: (payload) => LandingPlansService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPlans'] });
    },
  });
};

export const useUpdatePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<LandingPlan, Error, { id: number; data: Partial<LandingPlan> }>({
    mutationFn: ({ id, data }) => LandingPlansService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPlans'] });
    },
  });
};

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => LandingPlansService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPlans'] });
    },
  });
};
