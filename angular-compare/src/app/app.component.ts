import { Component, inject, computed } from '@angular/core';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DataFetchingToggleComponent } from './components/data-fetching-toggle/data-fetching-toggle.component';
import { WeatherService } from './services/weather.service';
import { WeatherResourceService } from './services/weather-resource.service';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  imports: [
    LocationSearchComponent,
    CurrentWeatherComponent,
    ForecastListComponent,
    LoadingSpinnerComponent,
    DataFetchingToggleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  appState = inject(AppStateService);

  dataFetchingMethod = computed(() => this.appState.dataFetchingMethod());

  loading = computed(() => 
    this.appState.dataFetchingMethod() === 'rxjs' 
      ? this.weatherService.loading() 
      : this.weatherResourceService.loading()
  );
}
