import { Component, signal, inject, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-location-search',
  standalone: true,
  template: `
    <div class="location-search">
      <input
        type="text"
        class="search-input"
        placeholder="Enter coordinates (e.g., 40.7128,-74.0060)"
        [value]="searchQuery()"
        (input)="onSearchChange($event)"
        (keydown.enter)="handleSearch()"
      />
      <button
        class="search-button"
        [disabled]="loading()"
        (click)="handleSearch()"
      >
        @if (loading()) {
          Searching...
        } @else {
          Get Weather
        }
      </button>
      @if (error()) {
        <div class="error-message">{{ error() }}</div>
      }
    </div>
  `
})
export class LocationSearchComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  appState = inject(AppStateService);
  searchQuery = signal('40.7128,-74.0060');

  loading = computed(() => 
    this.appState.dataFetchingMethod() === 'rxjs' 
      ? this.weatherService.loading() 
      : this.weatherResourceService.loading()
  );

  error = computed(() => 
    this.appState.dataFetchingMethod() === 'rxjs' 
      ? this.weatherService.error() 
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
      
      if (this.appState.dataFetchingMethod() === 'rxjs') {
        this.weatherService.searchWeather(coords[0], coords[1]).subscribe();
      } else {
        this.weatherResourceService.searchWeather(coords[0], coords[1]);
      }
    }
  }
}
