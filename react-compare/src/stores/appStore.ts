import { create } from 'zustand';
import { useWeatherDataStore } from './weatherDataStore';

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
  
  setDataFetchingMethod: (method) => {
    // Clear weather data when switching methods
    useWeatherDataStore.getState().clearWeatherData();
    set({ dataFetchingMethod: method, selectedLocation: null });
  },
  
  setSelectedLocation: (location) => set({ selectedLocation: location })
}));
