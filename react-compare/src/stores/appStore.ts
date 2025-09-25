import { create } from 'zustand';
import { useWeatherDataStore } from './weatherDataStore';

interface AppState {
  dataFetchingMethod: 'vanilla' | 'react-query';
  selectedLocation: { lat: number; lon: number } | null;
}

interface AppActions {
  setDataFetchingMethod: (method: 'vanilla' | 'react-query') => void;
  setSelectedLocation: (location: { lat: number; lon: number } | null) => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  dataFetchingMethod: 'vanilla',
  selectedLocation: null,

  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setDataFetchingMethod: (method) => {
    useWeatherDataStore.getState().clearWeatherData();
    set({ dataFetchingMethod: method, selectedLocation: null });
  },
}));
