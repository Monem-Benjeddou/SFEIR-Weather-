import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import GrainIcon from '@mui/icons-material/Grain';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const WeatherAnimation = ({ weatherCode, description }) => {
  const animation = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 300, friction: 10 },
    reset: true,
  });

  const getWeatherIcon = () => {
    // Weather condition codes based on OpenWeatherMap API
    if (weatherCode >= 200 && weatherCode < 300) {
      return <ThunderstormIcon sx={{ fontSize: 80, color: '#5c636e' }} />; // Thunderstorm
    } else if (weatherCode >= 300 && weatherCode < 400) {
      return <GrainIcon sx={{ fontSize: 80, color: '#85a8c7' }} />; // Drizzle
    } else if (weatherCode >= 500 && weatherCode < 600) {
      return <GrainIcon sx={{ fontSize: 80, color: '#4682b4' }} />; // Rain
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return <AcUnitIcon sx={{ fontSize: 80, color: '#e3e3e3' }} />; // Snow
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return <CloudIcon sx={{ fontSize: 80, color: '#b0c4de' }} />; // Atmosphere
    } else if (weatherCode === 800) {
      return <WbSunnyIcon sx={{ fontSize: 80, color: '#ffd700' }} />; // Clear
    } else {
      return <CloudIcon sx={{ fontSize: 80, color: '#778899' }} />; // Clouds
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
      }}
    >
      <animated.div style={animation} aria-label={description}>
        {getWeatherIcon()}
      </animated.div>
    </Box>
  );
};

export default WeatherAnimation;
