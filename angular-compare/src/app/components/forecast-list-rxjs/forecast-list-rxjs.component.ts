import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list-rxjs',
  standalone: true,
  imports: [AsyncPipe, WeatherCardComponent],
  template: `
    @if (weatherRxJSService.weatherData$ | async; as weather) {
      @if (weather.forecast.length > 0) {
        <div class="forecast-section">
          <h3 class="forecast-title">7-Day Forecast</h3>
          <div class="forecast-grid">
            @for (day of weather.forecast; track day.number) {
              <app-weather-card [forecast]="day" />
            }
          </div>
        </div>
      }
    }
  `
})
export class ForecastListRxJSComponent {
  weatherRxJSService = inject(WeatherRxJSService);
}