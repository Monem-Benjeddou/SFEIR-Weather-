import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Paper, Grid } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { getCurrentWeather, getUserLocation } from '../services/weatherService';

const WeatherGreeting = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const location = await getUserLocation();
        const weather = await getCurrentWeather(location.lat, location.lon);
        setWeatherData(weather);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getWeatherMessage = () => {
    if (!weatherData) return '';
    
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].main;
    const location = weatherData.name;

    if (condition.toLowerCase() === 'clear') {
      return `it's a beautiful sunny day in ${location}!`;
    } else if (temp <= 5) {
      return `bundle up, it's ${temp}°C in ${location}.`;
    } else if (temp >= 25) {
      return `it's a warm ${temp}°C in ${location}.`;
    }
    return `it's ${temp}°C in ${location} with ${condition.toLowerCase()}.`;
  };

  const getRecommendations = () => {
    if (!weatherData) return [];

    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    let recommendations = [];

    // Default recommendations
    recommendations.push({
      icon: "🌳",
      text: "Nice day to spend time outdoors!"
    });

    // Temperature-based recommendations
    if (temp <= 5) {
      recommendations = [
        { icon: "🎬", text: "Perfect time for a cozy movie day!" },
        { icon: "☕", text: "Great day for a hot chocolate!" },
        { icon: "📚", text: "Curl up with a good book!" }
      ];
    } else if (temp > 5 && temp <= 15) {
      recommendations.push(
        { icon: "🏃‍♂️", text: "Great weather for a light jog!" },
        { icon: "🚶‍♂️", text: "Perfect for a nature walk!" }
      );
    } else if (temp > 15 && temp <= 25) {
      recommendations.push(
        { icon: "🧺", text: "Perfect weather for a picnic!" },
        { icon: "🚴‍♀️", text: "Great day for cycling!" },
        { icon: "📸", text: "Take some outdoor photos!" }
      );
    } else if (temp > 25) {
      recommendations = [
        { icon: "🏊‍♂️", text: "Perfect day for swimming!" },
        { icon: "🍦", text: "Time for ice cream!" },
        { icon: "⛱️", text: "Beach day weather!" }
      ];
    }

    // Weather condition specific recommendations
    if (condition.includes('rain')) {
      recommendations = [
        { icon: "🎮", text: "Perfect for indoor gaming!" },
        { icon: "🍵", text: "Enjoy a warm cup of tea!" },
        { icon: "🎨", text: "Try some indoor crafts!" }
      ];
    } else if (condition.includes('snow')) {
      recommendations = [
        { icon: "⛄", text: "Build a snowman!" },
        { icon: "🎿", text: "Great day for winter sports!" },
        { icon: "🧤", text: "Bundle up and play in the snow!" }
      ];
    } else if (condition.includes('clear') && (hour >= 20 || hour <= 5)) {
      recommendations.push({ icon: "✨", text: "Perfect night for stargazing!" });
    }

    return recommendations.slice(0, 3);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <animated.div style={fadeIn}>
      <Box sx={{ 
        mb: 3, 
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 2,
        p: 3,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {`${getGreeting()}! ${getWeatherMessage()}`}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            Today's Recommendations
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {getRecommendations().map((rec, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{ mb: 1, fontSize: '2.5rem' }}
                  >
                    {rec.icon}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      lineHeight: 1.4
                    }}
                  >
                    {rec.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </animated.div>
  );
};

export default WeatherGreeting;
