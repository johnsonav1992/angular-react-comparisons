import { Component, inject, computed, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { CurrentWeatherRxJSComponent } from './components/current-weather-rxjs/current-weather-rxjs.component';
import { ForecastListRxJSComponent } from './components/forecast-list-rxjs/forecast-list-rxjs.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DataFetchingToggleComponent } from './components/data-fetching-toggle/data-fetching-toggle.component';
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
})
export class AppComponent implements OnInit {
  private readonly _weatherResourceService = inject(WeatherResourceService);
  public readonly weatherRxJSService = inject(WeatherRxJSService);
  private readonly _appState = inject(AppStateService);

  public ngOnInit() {
    console.log(
      '%c🅰️ Angular Weather Dashboard %cis up and running! %c🌦️',
      'color: #dd0031; font-weight: bold; font-size: 16px;',
      'color: #10b981; font-weight: normal;',
      'color: #3b82f6; font-size: 18px;'
    )
  }

  public readonly dataFetchingMethod = computed(() => this._appState.dataFetchingMethod());

  public readonly rxjsLoading = computed(() => {
    return this.weatherRxJSService.weatherData$;
  });

  public readonly loading = computed(() =>
    this._appState.dataFetchingMethod() === 'rxjs'
      ? false
      : this._weatherResourceService.loading()
  );
}
