import { Component, inject, computed, signal } from '@angular/core';
import { WeatherResourceService } from '../../services/weather-resource.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent {
  private readonly _weatherResourceService = inject(WeatherResourceService);

  public oldSkoolShowCelsius = false;

  public readonly showCelsius = signal(false);

  public readonly location = computed(() => this._weatherResourceService.location());
  public readonly currentWeather = computed(() => this._weatherResourceService.currentWeather());

  public readonly displayTemp = computed(() => {
    const weather = this.currentWeather();
    if (!weather) return null;

    return this.showCelsius() ?
      Math.round((weather.temperature - 32) * 5/9) :
      weather.temperature;
  });

  public readonly displayUnit = computed(() => this.showCelsius() ? 'C' : 'F');

  toggleTempUnit() {
    this.showCelsius.update((prevUnit) => !prevUnit);

    /*
      properties on the component used to just be set directly, like so:

      this.showCelsius = true;

      And Zone.js would pick up on the change and update the UI.

      Now we use signals to manage reactivity explicitly and much more efficiently.
    */
  }
}
