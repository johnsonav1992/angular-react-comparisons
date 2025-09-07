import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  startWith,
  shareReplay
} from 'rxjs/operators';
import { WeatherData, LocationPoint, WeatherForecast } from '../types/weather';

export interface WeatherRxJSState {
  location: string;
  currentWeather: WeatherForecast | null;
  forecast: WeatherForecast[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherRxJSService {
  private http = inject(HttpClient);
  private searchSubject = new BehaviorSubject<{
    lat: number;
    lon: number;
  } | null>(null);

  readonly weatherData$: Observable<WeatherRxJSState> = this.searchSubject.pipe(
    switchMap((coords) => {
      if (!coords) {
        return [
          {
            location: '',
            currentWeather: null,
            forecast: [],
            loading: false,
            error: null
          } as WeatherRxJSState
        ];
      }

      return this.http
        .get<LocationPoint>(
          `https://api.weather.gov/points/${coords.lat},${coords.lon}`
        )
        .pipe(
          switchMap((point) => {
            const location = `${point.properties.relativeLocation.properties.city}, ${point.properties.relativeLocation.properties.state}`;

            return this.http.get<WeatherData>(point.properties.forecast).pipe(
              map((weatherData) => {
                const periods = weatherData.properties.periods;
                const current = periods[0];
                const forecast = periods.slice(1, 8);

                return {
                  location,
                  currentWeather: current,
                  forecast,
                  loading: false,
                  error: null
                };
              })
            );
          }),
          startWith({
            location: '',
            currentWeather: null,
            forecast: [],
            loading: true,
            error: null
          } as WeatherRxJSState),
          catchError(() => {
            return [
              {
                location: '',
                currentWeather: null,
                forecast: [],
                loading: false,
                error: 'Failed to fetch weather data'
              }
            ];
          })
        );
    }),
    shareReplay(1)
  );

  searchWeather(lat: number, lon: number): void {
    this.searchSubject.next({ lat, lon });
  }

  clearAll(): void {
    this.searchSubject.next(null);
  }
}
