import { Component, inject, computed } from '@angular/core';
import { WeatherResourceService } from '../../services/weather-resource.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent {
  private readonly _weatherResourceService = inject(WeatherResourceService);

  public readonly location = computed(() => this._weatherResourceService.location());
  public readonly currentWeather = computed(() => this._weatherResourceService.currentWeather());
}
