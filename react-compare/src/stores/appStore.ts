import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  dataFetchingMethod: 'vanilla' | 'react-query';
  selectedLocation: { lat: number; lon: number } | null;
}

interface AppActions {
  setTheme: (theme: 'light' | 'dark') => void;
  setDataFetchingMethod: (method: 'vanilla' | 'react-query') => void;
  setSelectedLocation: (location: { lat: number; lon: number } | null) => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  theme: 'light',
  dataFetchingMethod: 'vanilla',
  selectedLocation: null,

  setTheme: (theme) => set({ theme }),
  setDataFetchingMethod: (method) => set({ dataFetchingMethod: method }),
  setSelectedLocation: (location) => set({ selectedLocation: location })
}));
