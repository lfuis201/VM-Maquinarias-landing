import ApiService from '../../../shared/services/apiService';

export interface CreateClaimPayload {
  fullName: string;
  docType: string;
  docNumber: string;
  phone: string;
  email: string;
  address: string;
  isMinor: boolean;
  guardianName?: string;
  guardianDocType?: string;
  guardianDocNumber?: string;
  goodType: 'Producto' | 'Servicio';
  claimedAmount?: string | number;
  description: string;
  claimType: 'Reclamo' | 'Queja';
  details: string;
  request: string;
}

export const claimsService = {
  createClaim: async (payload: CreateClaimPayload) => {
    return ApiService.post('/claims', payload);
  },
};

export default claimsService;
