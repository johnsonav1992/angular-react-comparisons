import { Injectable, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { LocationPoint, WeatherData } from '../types/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherResourceService {
  private readonly _coordinates = signal<{ lat: number; lon: number } | null>(null);

  private readonly _locationResource = httpResource<LocationPoint>(() => {
    const coords = this._coordinates();
    return coords
      ? { url: `https://api.weather.gov/points/${coords.lat},${coords.lon}` }
      : undefined;
  });

  private readonly _weatherResource = httpResource<WeatherData>(() => {
    const location = this._locationResource.value();
    return location ? { url: location.properties.forecast } : undefined;
  });

  public readonly location = computed(() => {
    const locationData = this._locationResource.value();
    return locationData
      ? `${locationData.properties.relativeLocation.properties.city}, ${locationData.properties.relativeLocation.properties.state}`
      : '';
  });

  public readonly currentWeather = computed(() => {
    const weatherData = this._weatherResource.value();
    return weatherData ? weatherData.properties.periods[0] || null : null;
  });

  public readonly forecast = computed(() => {
    const weatherData = this._weatherResource.value();
    return weatherData ? weatherData.properties.periods.slice(1, 8) : [];
  });

  public readonly loading = computed(
    () => this._locationResource.isLoading() || this._weatherResource.isLoading()
  );

  public readonly error = computed(() =>
    this._locationResource.error() || this._weatherResource.error()
      ? 'Failed to fetch weather data'
      : null
  );

  public searchWeather(lat: number, lon: number): void {
    this._coordinates.set({ lat, lon });
  }

  public clearError(): void {
    this._locationResource.reload();
    this._weatherResource.reload();
  }

  public clearAll(): void {
    this._coordinates.set(null);
  }
}
