import { Component, inject, computed } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-data-fetching-toggle',
  templateUrl: './data-fetching-toggle.component.html',
  styles: [
    `
      .data-fetching-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 12px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        gap: 8px;
        align-items: center;
        z-index: 1000;
        border: 2px solid #0984e3;
      }

      .toggle-label {
        font-size: 14px;
        font-weight: 500;
      }

      .toggle-button {
        padding: 4px 8px;
        border: none;
        border-radius: 4px;
        background: #e0e0e0;
        color: black;
        cursor: pointer;
        font-size: 12px;
      }

      .toggle-button.active {
        background: #0984e3;
        color: white;
      }
    `
  ]
})
export class DataFetchingToggleComponent {
  private readonly _appState = inject(AppStateService);

  public readonly dataFetchingMethod = computed(() => this._appState.dataFetchingMethod());

  public setRxjs(): void {
    this._appState.setDataFetchingMethod('rxjs');
  }

  public setResource(): void {
    this._appState.setDataFetchingMethod('resource');
  }
}
