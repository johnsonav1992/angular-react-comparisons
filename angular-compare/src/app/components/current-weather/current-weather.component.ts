import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent {
  private readonly _weatherService = inject(WeatherService);
  private readonly _weatherResourceService = inject(WeatherResourceService);
  private readonly _appState = inject(AppStateService);

  public readonly location = computed(() =>
    this._appState.dataFetchingMethod() === 'rxjs'
      ? this._weatherService.location()
      : this._weatherResourceService.location()
  );

  public readonly currentWeather = computed(() =>
    this._appState.dataFetchingMethod() === 'rxjs'
      ? this._weatherService.currentWeather()
      : this._weatherResourceService.currentWeather()
  );
}
