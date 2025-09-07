import { useCallback } from 'react';
import type { LocationPoint, WeatherData } from '../types/weather';
import { useWeatherDataStore } from '../stores/weatherDataStore';

export const useWeatherVanilla = () => {
  const { setWeatherData } = useWeatherDataStore();

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setWeatherData({ loading: true, error: null });

    try {
      const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
      if (!pointResponse.ok) throw new Error('Failed to fetch location data');
      
      const point: LocationPoint = await pointResponse.json();
      const location = `${point.properties.relativeLocation.properties.city}, ${point.properties.relativeLocation.properties.state}`;

      setWeatherData({ location });

      const weatherResponse = await fetch(point.properties.forecast);
      if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
      
      const weatherData: WeatherData = await weatherResponse.json();
      const periods = weatherData.properties.periods;
      const current = periods[0];
      const forecast = periods.slice(1, 8);

      setWeatherData({
        currentWeather: current,
        forecast,
        loading: false,
        error: null
      });
    } catch (error) {
      setWeatherData({
        loading: false,
        error: 'Failed to fetch weather data'
      });
    }
  }, [setWeatherData]);

  return { fetchWeather };
};