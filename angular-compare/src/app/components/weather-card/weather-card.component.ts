import { Component, input } from '@angular/core';
import { WeatherForecast } from '../../types/weather';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html'
})
export class WeatherCardComponent {
  public readonly forecast = input.required<WeatherForecast>();
}
