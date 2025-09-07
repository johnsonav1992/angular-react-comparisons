import type { WeatherForecast } from '../types/weather';

interface WeatherCardProps {
  forecast: WeatherForecast;
}

export const WeatherCard = ({ forecast }: WeatherCardProps) => {
  return (
    <div className="weather-card">
      <div className="card-day">{forecast.name}</div>
      <img 
        className="card-icon" 
        src={forecast.icon} 
        alt={forecast.shortForecast} 
      />
      <div className="card-temps">
        <span className="card-high">{forecast.temperature}°</span>
        <span className="card-low">{forecast.temperatureUnit}</span>
      </div>
      <div className="card-description">{forecast.shortForecast}</div>
    </div>
  );
};