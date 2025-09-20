import { Component, signal, inject, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent {
  private readonly _weatherService = inject(WeatherService);
  private readonly _weatherResourceService = inject(WeatherResourceService);
  private readonly _weatherRxJSService = inject(WeatherRxJSService);
  private readonly _appState = inject(AppStateService);

  public readonly searchQuery = signal('32.7767,-96.7970');

  public readonly loading = computed(() =>
    this._appState.dataFetchingMethod() === 'rxjs'
      ? false
      : this._weatherResourceService.loading()
  );

  public readonly error = computed(() =>
    this._appState.dataFetchingMethod() === 'rxjs'
      ? null
      : this._weatherResourceService.error()
  );

  public onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  public handleSearch(): void {
    const coords = this.searchQuery()
      .split(',')
      .map((c) => parseFloat(c.trim()));
    if (coords.length === 2 && !coords.some(isNaN)) {
      // Clear previous data and start fresh search
      this._weatherService.clearAll();
      this._weatherResourceService.clearAll();
      this._weatherRxJSService.clearAll();

      if (this._appState.dataFetchingMethod() === 'rxjs') {
        this._weatherRxJSService.searchWeather(coords[0], coords[1]);
      } else {
        this._weatherResourceService.searchWeather(coords[0], coords[1]);
      }
    }
  }
}
