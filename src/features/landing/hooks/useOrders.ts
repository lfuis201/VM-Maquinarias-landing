import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrdersService } from '../services/ordersService';
import type { Order } from '../types/order';

export const useMyOrdersQuery = () => {
  return useQuery<Order[], Error>({
    queryKey: ['my-orders'],
    queryFn: OrdersService.getMyOrders,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, Partial<Order>>({
    mutationFn: (orderData) => OrdersService.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });
};

export const useAdminOrdersQuery = () => {
  return useQuery<Order[], Error>({
    queryKey: ['admin-orders'],
    queryFn: OrdersService.getAdminOrders,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, { id: string; status: string }>({
    mutationFn: ({ id, status }) => OrdersService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, { id: string; data: Partial<Order> }>({
    mutationFn: ({ id, data }) => OrdersService.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });
};
