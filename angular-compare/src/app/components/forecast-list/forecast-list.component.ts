import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { AppStateService } from '../../services/app-state.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list',
  imports: [WeatherCardComponent],
  templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent {
  private readonly _weatherService = inject(WeatherService);
  private readonly _weatherResourceService = inject(WeatherResourceService);
  private readonly _appState = inject(AppStateService);

  public readonly forecast = computed(() =>
    this._appState.dataFetchingMethod() === 'rxjs'
      ? this._weatherService.forecast()
      : this._weatherResourceService.forecast()
  );
}
