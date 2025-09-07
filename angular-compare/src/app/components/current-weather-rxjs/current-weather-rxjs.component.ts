import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';

@Component({
  selector: 'app-current-weather-rxjs',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (weatherRxJSService.weatherData$ | async; as weather) {
      @if (weather.currentWeather) {
        <div class="current-weather">
          <h2 class="location-name">{{ weather.location }}</h2>
          <div class="current-temp">
            {{ weather.currentWeather.temperature }}°{{ weather.currentWeather.temperatureUnit }}
          </div>
          <div class="weather-description">
            {{ weather.currentWeather.shortForecast }}
          </div>
          <div class="weather-details">
            <div class="detail-item">
              <div class="detail-label">Wind</div>
              <div class="detail-value">
                {{ weather.currentWeather.windSpeed }} {{ weather.currentWeather.windDirection }}
              </div>
            </div>
            @if (weather.currentWeather.probabilityOfPrecipitation?.value !== null) {
              <div class="detail-item">
                <div class="detail-label">Rain Chance</div>
                <div class="detail-value">
                  {{ weather.currentWeather.probabilityOfPrecipitation!.value }}%
                </div>
              </div>
            }
            <div class="detail-item">
              <div class="detail-label">Period</div>
              <div class="detail-value">{{ weather.currentWeather.name }}</div>
            </div>
          </div>
        </div>
      }
    }
  `
})
export class CurrentWeatherRxJSComponent {
  weatherRxJSService = inject(WeatherRxJSService);
}