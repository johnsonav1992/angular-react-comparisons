import { Injectable, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { LocationPoint, WeatherData } from '../types/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherResourceService {
  private coordinates = signal<{ lat: number; lon: number } | null>(null);

  private locationResource = httpResource<LocationPoint>(() => {
    const coords = this.coordinates();
    return coords
      ? { url: `https://api.weather.gov/points/${coords.lat},${coords.lon}` }
      : undefined;
  });

  private weatherResource = httpResource<WeatherData>(() => {
    const location = this.locationResource.value();
    return location ? location.properties.forecast : undefined;
  });

  readonly location = computed(() => {
    const locationData = this.locationResource.value();
    return locationData
      ? `${locationData.properties.relativeLocation.properties.city}, ${locationData.properties.relativeLocation.properties.state}`
      : '';
  });

  readonly currentWeather = computed(() => {
    const weatherData = this.weatherResource.value();
    return weatherData ? weatherData.properties.periods[0] || null : null;
  });

  readonly forecast = computed(() => {
    const weatherData = this.weatherResource.value();
    return weatherData ? weatherData.properties.periods.slice(1, 8) : [];
  });

  readonly loading = computed(
    () => this.locationResource.isLoading() || this.weatherResource.isLoading()
  );

  readonly error = computed(() =>
    this.locationResource.error() || this.weatherResource.error()
      ? 'Failed to fetch weather data'
      : null
  );

  searchWeather(lat: number, lon: number): void {
    this.coordinates.set({ lat, lon });
  }

  clearError(): void {
    this.locationResource.reload();
    this.weatherResource.reload();
  }

  clearAll(): void {
    this.coordinates.set(null);
  }
}
