import { useAppStore } from '../stores/appStore';
import { useWeatherDataStore } from '../stores/weatherDataStore';
import { useWeatherQuery } from '../hooks/useWeatherQuery';

export const CurrentWeather = () => {
  const { dataFetchingMethod, selectedLocation } = useAppStore();

  const vanillaData = useWeatherDataStore();
  const queryData = useWeatherQuery(
    selectedLocation?.lat,
    selectedLocation?.lon
  );

  const data = dataFetchingMethod === 'vanilla' ? vanillaData : queryData;

  if (!data.currentWeather) return null;

  return (
    <div className="current-weather">
      <h2 className="location-name">{data.location}</h2>
      <div className="current-temp">
        {data.currentWeather.temperature}°{data.currentWeather.temperatureUnit}
      </div>
      <div className="weather-description">
        {data.currentWeather.shortForecast}
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-label">Wind</div>
          <div className="detail-value">
            {data.currentWeather.windSpeed} {data.currentWeather.windDirection}
          </div>
        </div>
        {data.currentWeather.probabilityOfPrecipitation?.value !== null && (
          <div className="detail-item">
            <div className="detail-label">Rain Chance</div>
            <div className="detail-value">
              {data.currentWeather.probabilityOfPrecipitation!.value}%
            </div>
          </div>
        )}
        <div className="detail-item">
          <div className="detail-label">Period</div>
          <div className="detail-value">{data.currentWeather.name}</div>
        </div>
      </div>
    </div>
  );
};
