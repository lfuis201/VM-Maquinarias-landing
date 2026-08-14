import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LeadsService, type CreateLeadPayload, type Lead } from '../services/leadsService';

export const useCreateLeadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Lead, Error, CreateLeadPayload>({
    mutationFn: (payload: CreateLeadPayload) => LeadsService.createLead(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};

export const useLeadsQuery = () => {
  return useQuery<Lead[], Error>({
    queryKey: ['leads'],
    queryFn: () => LeadsService.getLeads(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateLeadStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Lead, Error, { id: string; status: 'PENDING' | 'CONTACTED' | 'DISMISSED' }>({
    mutationFn: ({ id, status }) => LeadsService.updateLeadStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};
