import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box, Typography, Paper } from '@mui/material';
import WeatherDisplay from './WeatherDisplay';
import SearchLocation from './SearchLocation';
import WeatherGreeting from './WeatherGreeting';
import ErrorMessage from './ErrorMessage';
import WellnessRecommendations from './WellnessRecommendations';
import axios from 'axios';
import { getForecastData } from '../services/weatherService';
import { useTheme } from '../theme/ThemeContext';
import { WaterDrop, Waves } from '@mui/icons-material';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 36.8065, lon: 10.1815 }); // Tunisia
  const { updateWeatherTheme } = useTheme();

  const fetchWeatherAndForecast = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastData] = await Promise.all([
        axios.get(`${WEATHER_BASE_URL}/weather`, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric'
          }
        }),
        getForecastData(lat, lon)
      ]);

      setWeather(weatherResponse.data);
      setForecast(forecastData);
      
      // Update theme based on current weather
      updateWeatherTheme(weatherResponse.data.weather[0].id);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreForecast = async () => {
    if (loadingMore || !currentLocation) return;
    
    setLoadingMore(true);
    try {
      const moreData = await getForecastData(
        currentLocation.lat,
        currentLocation.lon,
        forecast ? forecast.list.length + 8 : 24
      );
      setForecast(moreData);
    } catch (err) {
      console.error('Error loading more forecast data:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLocationSelect = (location) => {
    setCurrentLocation({ lat: location.lat, lon: location.lon });
    fetchWeatherAndForecast(location.lat, location.lon);
  };

  useEffect(() => {
    fetchWeatherAndForecast(currentLocation.lat, currentLocation.lon);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <WeatherGreeting />
      
      <SearchLocation 
        onSelect={handleLocationSelect}
      />
      
      <Box sx={{ position: 'relative', mt: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress size={60} />
          </Box>
        )}
        
        {error && <ErrorMessage message={error} />}
        
        {weather && !loading && (
          <>
            <WeatherDisplay 
              weather={weather}
              forecast={forecast}
              onLoadMore={loadMoreForecast}
              loadingMore={loadingMore}
            />
            
            <WellnessRecommendations weather={weather} />

            <Paper
              elevation={3}
              sx={{
                p: 3,
                mt: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Waves /> Ocean Health Tips
              </Typography>
              <Typography variant="body1" paragraph>
                The ocean and our health are deeply connected. The weather affects both ocean conditions 
                and our well-being. When we take care of the ocean, we take care of ourselves.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <WaterDrop color="primary" />
                <Typography variant="body2">
                  Current ocean conditions are optimal for {weather.main.temp > 20 ? 'swimming and water activities' : 'observing and meditation'}.
                </Typography>
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </Container>
  );
};

export default WeatherPage;
