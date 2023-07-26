import {create} from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  // Otros campos del estado global que desees
  setUser: (user) => set({ user }),
}));

export default useUserStore;