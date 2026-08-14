import ApiService from '../../../shared/services/apiService';

export interface SendMailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface SendMailResponse {
  success: boolean;
  messageId?: string;
  mock?: boolean;
  message: string;
}

export const MailService = {
  sendMail: async (payload: SendMailPayload): Promise<SendMailResponse> => {
    const response = await ApiService.post<any>('/mail/send', payload);
    return response.data || response;
  },
};

export default MailService;
