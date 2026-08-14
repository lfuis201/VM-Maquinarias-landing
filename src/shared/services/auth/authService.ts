import ApiService from '../apiService';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  data?: {
    token: string;
    user: UserProfile;
  };
  user?: UserProfile;
  message?: string;
}

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // If it is mock credentials, we can handle it here or let the caller decide, 
    // but typically we want to hit the login API endpoint
    return ApiService.post<LoginResponse>('/auth/login', { email, password });
  },

  googleLogin: async (token: string): Promise<any> => {
    return ApiService.post<any>('/auth/google', { token });
  },

  register: async (registerData: {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<any> => {
    return ApiService.post<any>('/auth/register', registerData);
  },

  getProfile: async (): Promise<UserProfile> => {
    return ApiService.get<UserProfile>('/auth/me');
  },

  updateProfile: async (profileData: {
    firstName: string;
    lastName: string;
    phone?: string;
    password?: string;
  }): Promise<UserProfile> => {
    return ApiService.put<UserProfile>('/auth/profile', profileData);
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
