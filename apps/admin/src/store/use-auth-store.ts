import { create } from 'zustand';
import { AdminProfile } from '@axa/types';

interface AuthState {
  admin: AdminProfile | null;
  isAuthenticated: boolean;
  setAdmin: (admin: AdminProfile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  isAuthenticated: false,
  setAdmin: (admin) => set({ admin, isAuthenticated: !!admin }),
  logout: () => set({ admin: null, isAuthenticated: false })
}));
