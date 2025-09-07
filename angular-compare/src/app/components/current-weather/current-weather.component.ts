import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  template: `
    @if (currentWeather()) {
      <div class="current-weather">
        <h2 class="location-name">{{ location() }}</h2>
        <div class="current-temp">
          {{ currentWeather()!.temperature }}°{{
            currentWeather()!.temperatureUnit
          }}
        </div>
        <div class="weather-description">
          {{ currentWeather()!.shortForecast }}
        </div>
        <div class="weather-details">
          <div class="detail-item">
            <div class="detail-label">Wind</div>
            <div class="detail-value">
              {{ currentWeather()!.windSpeed }}
              {{ currentWeather()!.windDirection }}
            </div>
          </div>
          @if (currentWeather()!.probabilityOfPrecipitation?.value !== null) {
            <div class="detail-item">
              <div class="detail-label">Rain Chance</div>
              <div class="detail-value">
                {{ currentWeather()!.probabilityOfPrecipitation!.value }}%
              </div>
            </div>
          }
          <div class="detail-item">
            <div class="detail-label">Period</div>
            <div class="detail-value">{{ currentWeather()!.name }}</div>
          </div>
        </div>
      </div>
    }
  `
})
export class CurrentWeatherComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  appState = inject(AppStateService);

  location = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? this.weatherService.location()
      : this.weatherResourceService.location()
  );

  currentWeather = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? this.weatherService.currentWeather()
      : this.weatherResourceService.currentWeather()
  );
}
