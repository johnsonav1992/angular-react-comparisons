import { Component, inject, computed } from '@angular/core';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list',
  imports: [WeatherCardComponent],
  templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent {
  private readonly _weatherResourceService = inject(WeatherResourceService);

  public readonly forecast = computed(() => this._weatherResourceService.forecast());
}
