import ApiService from '../../../shared/services/apiService';
import { z } from 'zod';

export const UserProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
});

export const LoginResponseSchema = z.object({
  success: z.boolean().optional(),
  token: z.string().optional(),
  data: z.object({
    token: z.string().optional(),
    backendToken: z.string().optional(),
    user: UserProfileSchema,
  }).optional(),
  user: UserProfileSchema.optional(),
  message: z.string().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await ApiService.post<any>('/auth/login', { email, password });
    return LoginResponseSchema.parse(response);
  },

  getProfile: async (): Promise<UserProfile> => {
    return ApiService.get<UserProfile>('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  getToken: (): string | null => {
    return localStorage.getItem('adminToken');
  },

  setToken: (token: string): void => {
    localStorage.setItem('adminToken', token);
  }
};

export default AuthService;
