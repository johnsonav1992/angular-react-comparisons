import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from './stores/appStore';
import { useWeatherDataStore } from './stores/weatherDataStore';
import { useWeatherQuery } from './hooks/useWeatherQuery';
import { LocationSearch } from './components/LocationSearch';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastList } from './components/ForecastList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { DataFetchingToggle } from './components/DataFetchingToggle';

const queryClient = new QueryClient();

function WeatherApp() {
  const { dataFetchingMethod, selectedLocation } = useAppStore();
  const vanillaData = useWeatherDataStore();
  const queryData = useWeatherQuery(
    selectedLocation?.lat,
    selectedLocation?.lon
  );

  const data = dataFetchingMethod === 'vanilla' ? vanillaData : queryData;

  return (
    <div className="weather-app">
      <DataFetchingToggle />
      <header className="app-header">
        <h1 className="app-title">Weather Dashboard</h1>
        <p className="app-subtitle">
          React 19 with{' '}
          {dataFetchingMethod === 'vanilla'
            ? 'Vanilla Fetch + Zustand'
            : 'React Query'}
        </p>
      </header>
      <LocationSearch onRefetch={queryData.refetch} />
      {data.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CurrentWeather data={data} />
          <ForecastList data={data} />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;
