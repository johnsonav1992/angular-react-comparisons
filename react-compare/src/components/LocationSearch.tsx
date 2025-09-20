import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { useWeatherDataStore } from '../stores/weatherDataStore';
import { useWeatherVanilla } from '../hooks/useWeatherVanilla';

interface LocationSearchProps {
  onRefetch?: () => void;
}

export const LocationSearch = ({ onRefetch }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('32.7767,-96.7970');
  const { 
    dataFetchingMethod, 
    setSelectedLocation,
    selectedLocation 
  } = useAppStore();

  const { loading, error } = useWeatherDataStore();
  const { fetchWeather } = useWeatherVanilla();

  const handleSearch = () => {
    const coords = searchQuery.split(',').map((c) => parseFloat(c.trim()));
    
    if (coords.length === 2 && !coords.some(isNaN)) {
      const [lat, lon] = coords;

      const { clearWeatherData } = useWeatherDataStore.getState();
      clearWeatherData();

      if (dataFetchingMethod === 'vanilla') {
        fetchWeather(lat, lon);
      } else {
        if (selectedLocation?.lat === lat && selectedLocation?.lon === lon) {
          onRefetch?.();
        } else {
          setSelectedLocation({ lat, lon });
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="location-search">
      <input
        type="text"
        className="search-input"
        placeholder="Enter coordinates (e.g., 32.7767,-96.7970)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-button"
        disabled={loading}
        onClick={handleSearch}
      >
        {loading ? 'Searching...' : 'Get Weather'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
