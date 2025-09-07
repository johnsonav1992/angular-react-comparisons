import { Injectable, signal, computed, inject } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherResourceService } from './weather-resource.service';
import { WeatherRxJSService } from './weather-rxjs.service';

export type DataFetchingMethod = 'rxjs' | 'resource';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private weatherService = inject(WeatherService);
  private weatherResourceService = inject(WeatherResourceService);
  private weatherRxJSService = inject(WeatherRxJSService);

  private _dataFetchingMethod = signal<DataFetchingMethod>('rxjs');
  private _selectedLocation = signal<{ lat: number; lon: number } | null>(null);

  readonly dataFetchingMethod = computed(() => this._dataFetchingMethod());
  readonly selectedLocation = computed(() => this._selectedLocation());

  setDataFetchingMethod(method: DataFetchingMethod): void {
    this._dataFetchingMethod.set(method);
    this.clearWeatherData();
  }

  setSelectedLocation(location: { lat: number; lon: number } | null): void {
    this._selectedLocation.set(location);
  }

  private clearWeatherData(): void {
    // Clear all services' data when switching methods
    this.weatherService.clearAll();
    this.weatherResourceService.clearAll();
    this.weatherRxJSService.clearAll();
  }
}
