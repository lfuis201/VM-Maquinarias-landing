import ApiService from '../../../shared/services/apiService';

export interface CreateReviewPayload {
  name: string;
  role?: string;
  company?: string;
  comment: string;
  rating?: number;
  avatar?: string;
  isApproved?: boolean;
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  company?: string;
  comment: string;
  rating: number;
  avatar?: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ReviewsService = {
  getApprovedReviews: async (): Promise<Review[]> => {
    const response = await ApiService.get<any>('/reviews');
    return response.data || [];
  },

  getAllReviews: async (): Promise<Review[]> => {
    const response = await ApiService.get<any>('/reviews/admin');
    return response.data || [];
  },

  createReview: async (payload: CreateReviewPayload): Promise<Review> => {
    const response = await ApiService.post<any>('/reviews', payload);
    return response.data;
  },

  updateReview: async (id: string, payload: Partial<CreateReviewPayload>): Promise<Review> => {
    const response = await ApiService.patch<any>(`/reviews/${id}`, payload);
    return response.data;
  },

  deleteReview: async (id: string): Promise<void> => {
    await ApiService.delete<any>(`/reviews/${id}`);
  },
};

export default ReviewsService;
