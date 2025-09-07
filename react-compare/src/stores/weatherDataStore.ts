import { create } from 'zustand';
import type { WeatherState } from '../types/weather';

interface WeatherDataActions {
  setWeatherData: (data: Partial<WeatherState>) => void;
  clearWeatherData: () => void;
}

export const useWeatherDataStore = create<WeatherState & WeatherDataActions>((set) => ({
  location: '',
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,

  setWeatherData: (data) => set((state) => ({ ...state, ...data })),
  clearWeatherData: () => set({
    location: '',
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null
  })
}));