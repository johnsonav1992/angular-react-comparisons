import { useQuery } from '@tanstack/react-query';
import type { LocationPoint, WeatherData } from '../types/weather';

const fetchLocationData = async (
  lat: number,
  lon: number
): Promise<LocationPoint> => {
  const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
  if (!response.ok) throw new Error('Failed to fetch location data');
  return response.json();
};

const fetchWeatherData = async (forecastUrl: string): Promise<WeatherData> => {
  const response = await fetch(forecastUrl);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  return response.json();
};

export const useWeatherQuery = (lat?: number, lon?: number) => {
  const locationQuery = useQuery({
    queryKey: ['location', lat, lon],
    queryFn: () => fetchLocationData(lat!, lon!),
    enabled: !!lat && !!lon
  });

  const weatherQuery = useQuery({
    queryKey: ['weather', locationQuery.data?.properties.forecast],
    queryFn: () => fetchWeatherData(locationQuery.data!.properties.forecast),
    enabled: !!locationQuery.data?.properties.forecast
  });

  const location = locationQuery.data
    ? `${locationQuery.data.properties.relativeLocation.properties.city}, ${locationQuery.data.properties.relativeLocation.properties.state}`
    : '';

  const periods = weatherQuery.data?.properties.periods || [];
  const currentWeather = periods[0] || null;
  const forecast = periods.slice(1, 8);

  return {
    location,
    currentWeather,
    forecast,
    loading: locationQuery.isLoading || weatherQuery.isLoading || locationQuery.isFetching || weatherQuery.isFetching,
    error: locationQuery.error?.message || weatherQuery.error?.message || null,
    refetch: () => {
      locationQuery.refetch();
      weatherQuery.refetch();
    }
  };
};
