import ApiService from '../../../shared/services/apiService';

export interface CreateLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message?: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  message?: string;
  status: 'PENDING' | 'CONTACTED' | 'DISMISSED';
  createdAt: string;
}

export const LeadsService = {
  createLead: async (payload: CreateLeadPayload): Promise<Lead> => {
    const response = await ApiService.post<any>('/leads', payload);
    return response.data;
  },

  getLeads: async (): Promise<Lead[]> => {
    const response = await ApiService.get<any>('/leads');
    return response.data || [];
  },

  updateLeadStatus: async (id: string, status: string): Promise<Lead> => {
    const response = await ApiService.patch<any>(`/leads/${id}/status`, { status });
    return response.data;
  },
};

export default LeadsService;
