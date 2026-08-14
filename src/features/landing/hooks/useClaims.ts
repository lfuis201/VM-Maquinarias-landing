import { useMutation, useQueryClient } from '@tanstack/react-query';
import { claimsService, type CreateClaimPayload } from '../services/claimsService';

export const useCreateClaimMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClaimPayload) => claimsService.createClaim(payload),
    onSuccess: () => {
      // Invalidate claims queries in cache so any list view gets automatically updated
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
  });
};
