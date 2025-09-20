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
  private readonly _http = inject(HttpClient);

  private readonly _state = signal<WeatherState>({
    location: '',
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null
  });

  public readonly location = computed(() => this._state().location);
  public readonly currentWeather = computed(() => this._state().currentWeather);
  public readonly forecast = computed(() => this._state().forecast);
  public readonly loading = computed(() => this._state().loading);
  public readonly error = computed(() => this._state().error);

  public searchWeather(lat: number, lon: number): Observable<void> {
    this._state.update((state) => ({
      ...state,
      loading: true,
      error: null
    }));

    return this._http
      .get<LocationPoint>(`https://api.weather.gov/points/${lat},${lon}`)
      .pipe(
        switchMap((point) => {
          const location = `${point.properties.relativeLocation.properties.city}, ${point.properties.relativeLocation.properties.state}`;

          this._state.update((state) => ({
            ...state,
            location
          }));

          return this._http.get<WeatherData>(point.properties.forecast);
        }),
        map((weatherData) => {
          const periods = weatherData.properties.periods;
          const current = periods[0];
          const forecast = periods.slice(1, 8);

          this._state.update((state) => ({
            ...state,
            currentWeather: current,
            forecast,
            loading: false,
            error: null
          }));
        }),
        catchError((error) => {
          this._state.update((state) => ({
            ...state,
            loading: false,
            error: 'Failed to fetch weather data'
          }));
          return throwError(() => error);
        })
      );
  }

  public clearError(): void {
    this._state.update((state) => ({
      ...state,
      error: null
    }));
  }

  public clearAll(): void {
    this._state.set({
      location: '',
      currentWeather: null,
      forecast: [],
      loading: false,
      error: null
    });
  }
}
