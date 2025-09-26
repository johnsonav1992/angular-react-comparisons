import { Component, inject, computed, signal } from '@angular/core';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { ForecastFilterComponent } from '../forecast-filter/forecast-filter.component';
import type { WeatherForecast } from '../../types/weather';

@Component({
  selector: 'app-forecast-list',
  imports: [ForecastFilterComponent],
  templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent {
  private readonly _weatherResourceService = inject(WeatherResourceService);
  public readonly forecast = computed(() => this._weatherResourceService.forecast());
  public readonly displayCount = signal(0);

  onFilterChange(filteredForecast: WeatherForecast[]) {
    this.displayCount.set(filteredForecast.length);
  }
}
