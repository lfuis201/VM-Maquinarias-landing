import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewsService, type CreateReviewPayload, type Review } from '../services/reviewsService';

export const useApprovedReviewsQuery = () => {
  return useQuery<Review[], Error>({
    queryKey: ['approvedReviews'],
    queryFn: () => ReviewsService.getApprovedReviews(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useAllReviewsQuery = (enabled = true) => {
  return useQuery<Review[], Error>({
    queryKey: ['allReviews'],
    queryFn: () => ReviewsService.getAllReviews(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled,
  });
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, CreateReviewPayload>({
    mutationFn: (payload: CreateReviewPayload) => ReviewsService.createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, { id: string; payload: Partial<CreateReviewPayload> }>({
    mutationFn: ({ id, payload }) => ReviewsService.updateReview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => ReviewsService.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    },
  });
};
