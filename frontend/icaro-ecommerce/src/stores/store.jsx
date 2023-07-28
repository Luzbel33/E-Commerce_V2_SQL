import {create} from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  // Otros campos del estado global que desees
  setUser: (user) => set({ user }),
}));

