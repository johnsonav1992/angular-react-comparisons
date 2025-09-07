import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { WeatherData, LocationPoint, WeatherForecast } from '../types/weather';

export interface WeatherState {
  location: string;
  currentWeather: WeatherForecast | null;
  forecast: WeatherForecast[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);

  private state = signal<WeatherState>({
    location: '',
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null
  });

  readonly location = computed(() => this.state().location);
  readonly currentWeather = computed(() => this.state().currentWeather);
  readonly forecast = computed(() => this.state().forecast);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  searchWeather(lat: number, lon: number): Observable<void> {
    this.state.update((state) => ({
      ...state,
      loading: true,
      error: null
    }));

    return this.http
      .get<LocationPoint>(`https://api.weather.gov/points/${lat},${lon}`)
      .pipe(
        switchMap((point) => {
          const location = `${point.properties.relativeLocation.properties.city}, ${point.properties.relativeLocation.properties.state}`;

          this.state.update((state) => ({
            ...state,
            location
          }));

          return this.http.get<WeatherData>(point.properties.forecast);
        }),
        map((weatherData) => {
          const periods = weatherData.properties.periods;
          const current = periods[0];
          const forecast = periods.slice(1, 8);

          this.state.update((state) => ({
            ...state,
            currentWeather: current,
            forecast,
            loading: false,
            error: null
          }));
        }),
        catchError((error) => {
          this.state.update((state) => ({
            ...state,
            loading: false,
            error: 'Failed to fetch weather data'
          }));
          return throwError(() => error);
        })
      );
  }

  clearError(): void {
    this.state.update((state) => ({
      ...state,
      error: null
    }));
  }
}
