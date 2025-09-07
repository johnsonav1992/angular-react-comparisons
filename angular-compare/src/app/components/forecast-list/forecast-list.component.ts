import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { AppStateService } from '../../services/app-state.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [WeatherCardComponent],
  templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  appState = inject(AppStateService);

  forecast = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? this.weatherService.forecast()
      : this.weatherResourceService.forecast()
  );
}
