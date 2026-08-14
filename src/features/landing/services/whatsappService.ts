import ApiService from '../../../shared/services/apiService';

export interface SendWhatsappPayload {
  to: string;
  message: string;
  fileUrl?: string;
}

export const WhatsappService = {
  sendMessage: async (payload: SendWhatsappPayload): Promise<{ success: boolean; data: any }> => {
    const response = await ApiService.post<any>('/whatsapp/send', payload);
    return response.data || response;
  },
};

export default WhatsappService;
