import ApiService from '../../../shared/services/apiService';
import type { ApiResponse } from '../../../shared/types/api';

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export const ClientsService = {
  getClients: async (): Promise<Client[]> => {
    const response = await ApiService.get<ApiResponse<Client[]>>('/users/clients');
    return response.data || [];
  },

  createClient: async (clientData: {
    name: string;
    email: string;
    phone: string;
    document?: string;
  }): Promise<Client> => {
    const response = await ApiService.post<ApiResponse<Client>>('/users/clients', clientData);
    return response.data!;
  },

  updateClient: async (
    email: string,
    clientData: { name: string; phone: string }
  ): Promise<Client> => {
    const response = await ApiService.put<ApiResponse<Client>>(`/users/clients/${email}`, clientData);
    return response.data!;
  },
};

export default ClientsService;
