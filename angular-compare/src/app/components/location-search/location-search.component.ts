import { Component, signal, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

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
        [disabled]="weatherService.loading()"
        (click)="handleSearch()"
      >
        @if (weatherService.loading()) {
          Searching...
        } @else {
          Get Weather
        }
      </button>
      @if (weatherService.error()) {
        <div class="error-message">{{ weatherService.error() }}</div>
      }
    </div>
  `
})
export class LocationSearchComponent {
  weatherService = inject(WeatherService);
  searchQuery = signal('40.7128,-74.0060');

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  handleSearch(): void {
    const coords = this.searchQuery().split(',').map(c => parseFloat(c.trim()));
    if (coords.length === 2 && !coords.some(isNaN)) {
      this.weatherService.searchWeather(coords[0], coords[1]).subscribe();
    }
  }
}