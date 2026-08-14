import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CatalogService } from '../services/catalogService';
import type { Product } from '../types/catalog';

export const useProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: CatalogService.getProducts,
    // Devolvemos una lista vacía si hay un error para mantener la robustez del componente
    placeholderData: [],
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, Omit<Product, 'id'> | FormData>({
    mutationFn: CatalogService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, { id: string; payload: Partial<Product> | FormData }>({
    mutationFn: ({ id, payload }) => CatalogService.updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: CatalogService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
