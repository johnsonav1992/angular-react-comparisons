import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';

@Component({
  selector: 'app-current-weather-rxjs',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './current-weather-rxjs.component.html'
})
export class CurrentWeatherRxJSComponent {
  weatherRxJSService = inject(WeatherRxJSService);
}
