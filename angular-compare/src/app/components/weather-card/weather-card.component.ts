import { Component, Input, input } from '@angular/core';
import { WeatherForecast } from '../../types/weather';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html'
})
export class WeatherCardComponent {
  // Many apps will still use this input approach, but
  // input signals are safer and easier to use!
  @Input()
  public forecastOldSkoolInput!: WeatherForecast;

  public readonly forecast = input.required<WeatherForecast>();
}
