import { Component, signal, inject, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-location-search',
  standalone: true,
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  weatherRxJSService = inject(WeatherRxJSService);
  appState = inject(AppStateService);
  searchQuery = signal('32.7767,-96.7970');

  loading = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? false // RxJS service uses observables, loading handled in components
      : this.weatherResourceService.loading()
  );

  error = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? null // RxJS service uses observables, error handled in components
      : this.weatherResourceService.error()
  );

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  handleSearch(): void {
    const coords = this.searchQuery()
      .split(',')
      .map((c) => parseFloat(c.trim()));
    if (coords.length === 2 && !coords.some(isNaN)) {
      // Clear previous data and start fresh search
      this.weatherService.clearAll();
      this.weatherResourceService.clearAll();
      this.weatherRxJSService.clearAll();

      if (this.appState.dataFetchingMethod() === 'rxjs') {
        this.weatherRxJSService.searchWeather(coords[0], coords[1]);
      } else {
        this.weatherResourceService.searchWeather(coords[0], coords[1]);
      }
    }
  }
}
