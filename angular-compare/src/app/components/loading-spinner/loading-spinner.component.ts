import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="loading-text">Loading weather data...</div>
    </div>
  `
})
export class LoadingSpinnerComponent {}
