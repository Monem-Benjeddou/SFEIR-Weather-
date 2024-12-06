import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import WeatherAnimation from './WeatherAnimation';

const WeeklyForecast = ({ forecast }) => {
  const [timeRange, setTimeRange] = useState('week'); // Default is 'week'
  const [processedDays, setProcessedDays] = useState([]);

  useEffect(() => {
    if (!forecast || !forecast.list) {
      console.log('No forecast data available');
      return;
    }

    // Group forecast data by day with more robust logic
    const dailyForecasts = forecast.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temp: {
            current: item.main.temp,
            max: item.main.temp_max,
            min: item.main.temp_min
          },
          weather: item.weather[0],
          date: date,
          humidity: item.main.humidity,
          wind: {
            speed: item.wind.speed,
            direction: item.wind.deg
          },
          precipitation: item.pop || 0
        };
      } else {
        // Update max and min temperatures
        acc[dateKey].temp.max = Math.max(acc[dateKey].temp.max, item.main.temp_max);
        acc[dateKey].temp.min = Math.min(acc[dateKey].temp.min, item.main.temp_min);
        // Update current temperature with the most recent reading
        acc[dateKey].temp.current = item.main.temp;
        // Update weather with the most recent condition
        acc[dateKey].weather = item.weather[0];
      }
      
      return acc;
    }, {});

    // Convert to array and sort by date
    const days = Object.entries(dailyForecasts)
      .map(([_, data]) => data)
      .sort((a, b) => a.date - b.date);

    console.log('Processed forecast days:', days.length);
    setProcessedDays(days);
  }, [forecast]);

  if (!forecast || !forecast.list) {
    console.log('Rendering null - no forecast data');
    return null;
  }

  // Filter days based on selected time range
  const rangeMapping = {
    week: Math.min(7, processedDays.length), // Use all available days up to 7
    '3days': Math.min(3, processedDays.length),
    '5days': Math.min(5, processedDays.length)
  };
  
  const filteredDays = processedDays.slice(0, rangeMapping[timeRange]);
  console.log('Filtered days:', filteredDays.length, 'for range:', timeRange);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 2,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        width: '100%'
      }}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2">
          Weekly Forecast
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="3days">3 Days</MenuItem>
            <MenuItem value="5days">5 Days</MenuItem>
            <MenuItem value="week">Week</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredDays.map((day, index) => (
          <Grid item xs={12} sm={timeRange === '3days' ? 4 : 6} md={timeRange === '3days' ? 4 : 2.4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                transition: 'transform 0.2s',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                {day.day}
              </Typography>
              
              <Box sx={{ height: 70, width: '100%', display: 'flex', justifyContent: 'center', mb: 1.5 }}>
                <WeatherAnimation
                  weatherCode={day.weather.id}
                  description={day.weather.description}
                  size="medium"
                />
              </Box>
              
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  {Math.round(day.temp.current)}°
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  H: {Math.round(day.temp.max)}° L: {Math.round(day.temp.min)}°
                </Typography>
              </Box>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {day.weather.description}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Humidity: {day.humidity}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Wind: {Math.round(day.wind.speed)} m/s
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default WeeklyForecast;
