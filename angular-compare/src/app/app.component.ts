import { Component, inject, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { CurrentWeatherRxJSComponent } from './components/current-weather-rxjs/current-weather-rxjs.component';
import { ForecastListRxJSComponent } from './components/forecast-list-rxjs/forecast-list-rxjs.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DataFetchingToggleComponent } from './components/data-fetching-toggle/data-fetching-toggle.component';
import { WeatherService } from './services/weather.service';
import { WeatherResourceService } from './services/weather-resource.service';
import { WeatherRxJSService } from './services/weather-rxjs.service';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    LocationSearchComponent,
    CurrentWeatherComponent,
    ForecastListComponent,
    CurrentWeatherRxJSComponent,
    ForecastListRxJSComponent,
    LoadingSpinnerComponent,
    DataFetchingToggleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherService = inject(WeatherService);
  weatherResourceService = inject(WeatherResourceService);
  weatherRxJSService = inject(WeatherRxJSService);
  appState = inject(AppStateService);

  dataFetchingMethod = computed(() => this.appState.dataFetchingMethod());

  rxjsLoading = computed(() => {
    // This will be used in template with async pipe
    return this.weatherRxJSService.weatherData$;
  });

  loading = computed(() =>
    this.appState.dataFetchingMethod() === 'rxjs'
      ? false // Loading handled via async pipe in template
      : this.weatherResourceService.loading()
  );
}
