import { create } from 'zustand';
import { AuthService } from '../services/authService';
import type { UserProfile } from '../services/authService';

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: UserProfile) => void;
  logout: () => void;
  initialize: () => void;
}

const getStoredToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

const getStoredUser = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  const storedUser = localStorage.getItem('adminUser');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('Error parsing stored user', e);
    }
  }
  return null;
};

const initialToken = getStoredToken();
const initialUser = getStoredUser();

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  user: initialUser,
  isAuthenticated: !!initialToken,

  setAuth: (token, user) => {
    AuthService.setToken(token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    AuthService.logout();
    localStorage.removeItem('adminUser');
    set({ token: null, user: null, isAuthenticated: false });
  },

  initialize: () => {
    // Keep as no-op or re-read just in case
    const token = getStoredToken();
    const user = getStoredUser();
    set({ token, user, isAuthenticated: !!token });
  }
}));
