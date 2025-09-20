import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list-rxjs',
  standalone: true,
  imports: [AsyncPipe, WeatherCardComponent],
  templateUrl: './forecast-list-rxjs.component.html'
})
export class ForecastListRxJSComponent {
  weatherRxJSService = inject(WeatherRxJSService);
}
