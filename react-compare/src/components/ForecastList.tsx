import { WeatherCard } from './WeatherCard';

interface ForecastListProps {
  data: {
    location: string;
    currentWeather: any;
    forecast: any[];
    loading: boolean;
    error: string | null;
  };
}

export const ForecastList = ({ data }: ForecastListProps) => {

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
