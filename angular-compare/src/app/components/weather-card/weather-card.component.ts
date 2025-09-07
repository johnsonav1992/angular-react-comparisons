import { Component, input } from '@angular/core';
import { WeatherForecast } from '../../types/weather';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  templateUrl: './weather-card.component.html'
})
export class WeatherCardComponent {
  forecast = input.required<WeatherForecast>();
}
