import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResourceService } from '../../services/weather-resource.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  appState = inject(AppStateService);

  location = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? this.weatherService.location()
      : this.weatherResourceService.location()
  );

  currentWeather = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? this.weatherService.currentWeather()
      : this.weatherResourceService.currentWeather()
  );
}
