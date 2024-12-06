import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import WeatherAnimation from './WeatherAnimation';
import WeeklyForecast from './WeeklyForecast';
import HourlyForecast from './HourlyForecast';

const WeatherDisplay = ({ weather, forecast }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  if (!weather) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <animated.div style={fadeIn}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {weather.name}, {weather.sys.country}
            </Typography>

            <WeatherAnimation 
              weatherCode={weather.weather[0].id}
              description={weather.weather[0].description}
            />

            <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
              {Math.round(weather.main.temp)}°C
            </Typography>

            <Typography variant="h6" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
              {weather.weather[0].description}
            </Typography>

            <HourlyForecast forecast={forecast} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                width: '100%',
                mt: 2,
              }}
            >
              <WeatherDetail 
                label="Feels like" 
                value={`${Math.round(weather.main.feels_like)}°C`}
              />
              <WeatherDetail 
                label="Humidity" 
                value={`${weather.main.humidity}%`}
              />
              <WeatherDetail 
                label="Wind" 
                value={`${Math.round(weather.wind.speed)} m/s`}
              />
              <WeatherDetail 
                label="Pressure" 
                value={`${weather.main.pressure} hPa`}
              />
            </Box>
          </Box>
        </Paper>
      </animated.div>

      {forecast && <WeeklyForecast forecast={forecast} />}
    </Box>
  );
};

const WeatherDetail = ({ label, value }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
      {value}
    </Typography>
  </Box>
);

export default WeatherDisplay;
