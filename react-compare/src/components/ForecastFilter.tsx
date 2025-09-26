import { useState } from 'react';
import { WeatherCard } from './WeatherCard';
import type { WeatherForecast } from '../types/weather';

interface ForecastFilterProps {
  forecast: WeatherForecast[];
  onFilterChange: (filteredForecast: WeatherForecast[]) => void;
}

export const ForecastFilter = ({ forecast, onFilterChange }: ForecastFilterProps) => {
  const [showOnlyRainy, setShowOnlyRainy] = useState(false);

  const handleToggle = (checked: boolean) => {
    setShowOnlyRainy(checked);

    const filteredForecast = checked
      ? forecast.filter(day =>
          day.probabilityOfPrecipitation?.value &&
          day.probabilityOfPrecipitation.value > 30
        )
      : forecast;

    onFilterChange(filteredForecast);
  };

  const filteredForecast = showOnlyRainy
    ? forecast.filter(day =>
        day.probabilityOfPrecipitation?.value &&
        day.probabilityOfPrecipitation.value > 30
      )
    : forecast;

  return (
    <>
      <label className="filter-toggle">
        <input
          type="checkbox"
          checked={showOnlyRainy}
          onChange={(e) => handleToggle(e.target.checked)}
        />
        Show only rainy days
      </label>
      <div className="forecast-grid">
        {filteredForecast.map((day) => (
          <WeatherCard key={day.number} forecast={day} />
        ))}
        {filteredForecast.length === 0 && showOnlyRainy && (
          <div className="no-results">No rainy days in the forecast! ☀️</div>
        )}
      </div>
    </>
  );
};