import { useState } from 'react';
import { WeatherCard } from './WeatherCard';
import { ForecastFilter } from './ForecastFilter';
import type { WeatherState, WeatherForecast } from '../types/weather';

interface ForecastListProps {
  data: WeatherState;
}

export const ForecastList = ({ data }: ForecastListProps) => {
  const [displayCount, setDisplayCount] = useState(0);

  if (data.forecast.length === 0) return null;

  const handleFilterChange = (filteredForecast: WeatherForecast[]) => {
    setDisplayCount(filteredForecast.length);
  };

  return (
    <div className="forecast-section">
      <div className="forecast-header">
        <h3 className="forecast-title">7-Day Forecast</h3>
        <div className="forecast-info">Showing {displayCount} days</div>
      </div>
      <ForecastFilter
        forecast={data.forecast}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};
