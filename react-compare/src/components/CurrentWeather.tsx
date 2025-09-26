import { useState } from 'react';
import type { WeatherState } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherState;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const [showCelsius, setShowCelsius] = useState(false);

  if (!data.currentWeather) return null;

  const displayTemp = showCelsius ?
    Math.round((data.currentWeather.temperature - 32) * 5/9) :
    data.currentWeather.temperature;
  const displayUnit = showCelsius ? 'C' : 'F';

  return (
    <div className="current-weather">
      <h2 className="location-name">{data.location}</h2>
      <div className="current-temp">
        {displayTemp}°{displayUnit}
        <button
          className="temp-toggle"
          onClick={() => setShowCelsius(!showCelsius)}
          title={`Switch to ${showCelsius ? 'Fahrenheit' : 'Celsius'}`}
        >
          °{showCelsius ? 'F' : 'C'}
        </button>
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
