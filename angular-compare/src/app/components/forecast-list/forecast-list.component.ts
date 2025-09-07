import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [WeatherCardComponent],
  templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent {
  weatherService = inject(WeatherService);
}