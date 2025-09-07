import { useAppStore } from '../stores/appStore';
import { useWeatherDataStore } from '../stores/weatherDataStore';
import { useWeatherQuery } from '../hooks/useWeatherQuery';
import { WeatherCard } from './WeatherCard';

export const ForecastList = () => {
  const { dataFetchingMethod, selectedLocation } = useAppStore();
  
  const vanillaData = useWeatherDataStore();
  const queryData = useWeatherQuery(
    selectedLocation?.lat, 
    selectedLocation?.lon
  );

  const data = dataFetchingMethod === 'vanilla' ? vanillaData : queryData;

  if (data.forecast.length === 0) return null;

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-grid">
        {data.forecast.map((day) => (
          <WeatherCard key={day.number} forecast={day} />
        ))}
      </div>
    </div>
  );
};