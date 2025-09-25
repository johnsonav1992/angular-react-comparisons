import { Injectable, signal, computed, inject } from '@angular/core';
import { WeatherResourceService } from './weather-resource.service';
import { WeatherRxJSService } from './weather-rxjs.service';

export type DataFetchingMethod = 'rxjs' | 'resource';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly _weatherResourceService = inject(WeatherResourceService);
  private readonly _weatherRxJSService = inject(WeatherRxJSService);

  private readonly _dataFetchingMethod = signal<DataFetchingMethod>('rxjs');
  private readonly _selectedLocation = signal<{ lat: number; lon: number } | null>(null);

  public readonly dataFetchingMethod = computed(() => this._dataFetchingMethod());
  public readonly selectedLocation = computed(() => this._selectedLocation());

  public setDataFetchingMethod(method: DataFetchingMethod): void {
    this._dataFetchingMethod.set(method);
    this._clearWeatherData();
  }

  public setSelectedLocation(location: { lat: number; lon: number } | null): void {
    this._selectedLocation.set(location);
  }

  private _clearWeatherData(): void {
    this._weatherResourceService.clearAll();
    this._weatherRxJSService.clearAll();
  }
}
