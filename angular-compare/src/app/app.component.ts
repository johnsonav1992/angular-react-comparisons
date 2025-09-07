import { Component, inject } from '@angular/core';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [LocationSearchComponent, CurrentWeatherComponent, ForecastListComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherService = inject(WeatherService);
}
