import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { useWeatherDataStore } from '../stores/weatherDataStore';
import { useWeatherVanilla } from '../hooks/useWeatherVanilla';

export const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('40.7128,-74.0060');
  const { dataFetchingMethod, setSelectedLocation } = useAppStore();
  const { loading, error } = useWeatherDataStore();
  const { fetchWeather } = useWeatherVanilla();

  const handleSearch = () => {
    const coords = searchQuery.split(',').map(c => parseFloat(c.trim()));
    if (coords.length === 2 && !coords.some(isNaN)) {
      const [lat, lon] = coords;
      
      if (dataFetchingMethod === 'vanilla') {
        fetchWeather(lat, lon);
      } else {
        setSelectedLocation({ lat, lon });
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
        placeholder="Enter coordinates (e.g., 40.7128,-74.0060)"
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