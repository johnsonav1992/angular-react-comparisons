import { Component, input, output, signal, computed, Output, EventEmitter } from '@angular/core';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import type { WeatherForecast } from '../../types/weather';

@Component({
  selector: 'app-forecast-filter',
  imports: [WeatherCardComponent],
  templateUrl: './forecast-filter.component.html'
})
export class ForecastFilterComponent {
  public readonly forecast = input.required<WeatherForecast[]>();
  public readonly filterChange = output<WeatherForecast[]>();

  // The old skool way to pass events up to the parent
  @Output() public oldSkoolFilterChange = new EventEmitter<WeatherForecast[]>();

  public readonly showOnlyRainy = signal(false);

  public readonly filteredForecast = computed(() => {
    const forecastData = this.forecast();
    return this.showOnlyRainy()
      ? forecastData.filter(day =>
          day.probabilityOfPrecipitation?.value &&
          day.probabilityOfPrecipitation.value > 30
        )
      : forecastData;
  });

  toggleFilter(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.showOnlyRainy.set(checked);
    this.filterChange.emit(this.filteredForecast());
  }
}
