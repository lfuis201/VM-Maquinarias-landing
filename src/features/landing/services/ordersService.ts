import ApiService from '../../../shared/services/apiService';
import type { Order } from '../types/order';

export const OrdersService = {
  createOrder: async (orderData: Partial<Order>): Promise<Order> => {
    const response = await ApiService.post<any>('/orders', orderData);
    return response.data;
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await ApiService.get<any>('/orders/my-orders');
    return response.data || [];
  },

  getAdminOrders: async (): Promise<Order[]> => {
    const response = await ApiService.get<any>('/orders');
    return response.data || [];
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    const response = await ApiService.put<any>(`/orders/${id}/status`, { status });
    return response.data;
  },

  updateOrder: async (id: string, orderData: Partial<Order>): Promise<Order> => {
    const response = await ApiService.put<any>(`/orders/${id}`, orderData);
    return response.data;
  }
};

export default OrdersService;
