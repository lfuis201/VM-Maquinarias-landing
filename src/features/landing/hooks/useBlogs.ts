import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BlogService } from '../services/blogService';
import type { Blog } from '../types/blog';

export const useBlogsQuery = () => {
  return useQuery<Blog[], Error>({
    queryKey: ['blogs'],
    queryFn: BlogService.getAll,
    placeholderData: [],
  });
};

export const useBlogDetailQuery = (id?: number) => {
  return useQuery<Blog, Error>({
    queryKey: ['blog', id],
    queryFn: () => BlogService.getById(id!),
    enabled: !!id,
  });
};

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Blog, Error, Partial<Blog>>({
    mutationFn: (payload) => BlogService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Blog, Error, { id: number; data: Partial<Blog> }>({
    mutationFn: ({ id, data }) => BlogService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
  });
};

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => BlogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
