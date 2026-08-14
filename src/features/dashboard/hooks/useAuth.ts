import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/authService';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
    onSuccess: (data) => {
      const token = data.token || data.data?.token || data.data?.backendToken;
      if (token) {
        AuthService.setToken(token);
        // Pre-populate or invalidate the profile query
        const user = data.user || data.data?.user;
        if (user) {
          queryClient.setQueryData(['authProfile'], user);
        } else {
          queryClient.invalidateQueries({ queryKey: ['authProfile'] });
        }
      }
    },
  });
};

export const useProfile = (token: string | null) => {
  return useQuery({
    queryKey: ['authProfile'],
    queryFn: () => AuthService.getProfile(),
    enabled: !!token && token !== 'mock-admin-token-12345',
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useLogoutHook = () => {
  const queryClient = useQueryClient();

  return () => {
    AuthService.logout();
    queryClient.setQueryData(['authProfile'], null);
    queryClient.removeQueries({ queryKey: ['authProfile'] });
  };
};
