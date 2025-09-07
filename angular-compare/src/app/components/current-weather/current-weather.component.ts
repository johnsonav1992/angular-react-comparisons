import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  template: `
    @if (weatherService.currentWeather()) {
      <div class="current-weather">
        <h2 class="location-name">{{ weatherService.location() }}</h2>
        <div class="current-temp">
          {{ weatherService.currentWeather()!.temperature }}°{{
            weatherService.currentWeather()!.temperatureUnit
          }}
        </div>
        <div class="weather-description">
          {{ weatherService.currentWeather()!.shortForecast }}
        </div>
        <div class="weather-details">
          <div class="detail-item">
            <div class="detail-label">Wind</div>
            <div class="detail-value">
              {{ weatherService.currentWeather()!.windSpeed }}
              {{ weatherService.currentWeather()!.windDirection }}
            </div>
          </div>
          @if (
            weatherService.currentWeather()!.probabilityOfPrecipitation
              ?.value !== null
          ) {
            <div class="detail-item">
              <div class="detail-label">Rain Chance</div>
              <div class="detail-value">
                {{
                  weatherService.currentWeather()!.probabilityOfPrecipitation!
                    .value
                }}%
              </div>
            </div>
          }
          <div class="detail-item">
            <div class="detail-label">Period</div>
            <div class="detail-value">
              {{ weatherService.currentWeather()!.name }}
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class CurrentWeatherComponent {
  weatherService = inject(WeatherService);
}
