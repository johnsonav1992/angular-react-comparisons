import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';

@Component({
  selector: 'app-current-weather-rxjs',
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './current-weather-rxjs.component.html'
})
export class CurrentWeatherRxJSComponent {
  public readonly weatherRxJSService = inject(WeatherRxJSService);
  public readonly showCelsius = signal(false);

  toggleTempUnit() {
    this.showCelsius.update((prevUnit) => !prevUnit);
  }
}
