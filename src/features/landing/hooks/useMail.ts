import { useMutation } from '@tanstack/react-query';
import { MailService, type SendMailPayload, type SendMailResponse } from '../services/mailService';

export const useSendMailMutation = () => {
  return useMutation<SendMailResponse, Error, SendMailPayload>({
    mutationFn: (payload: SendMailPayload) => MailService.sendMail(payload),
  });
};
