import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list-rxjs',
  imports: [AsyncPipe, WeatherCardComponent],
  templateUrl: './forecast-list-rxjs.component.html'
})
export class ForecastListRxJSComponent {
  public readonly weatherRxJSService = inject(WeatherRxJSService);
}
