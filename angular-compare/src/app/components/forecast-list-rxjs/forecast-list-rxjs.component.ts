import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { WeatherRxJSService } from '../../services/weather-rxjs.service';
import { ForecastFilterComponent } from '../forecast-filter/forecast-filter.component';
import type { WeatherForecast } from '../../types/weather';

@Component({
  selector: 'app-forecast-list-rxjs',
  imports: [AsyncPipe, ForecastFilterComponent],
  templateUrl: './forecast-list-rxjs.component.html'
})
export class ForecastListRxJSComponent {
  public readonly weatherRxJSService = inject(WeatherRxJSService);
  public readonly displayCount = signal(0);

  onFilterChange(filteredForecast: WeatherForecast[]) {
    this.displayCount.set(filteredForecast.length);
  }
}
