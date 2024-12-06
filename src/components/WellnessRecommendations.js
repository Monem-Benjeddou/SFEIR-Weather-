import React from 'react';
import { Paper, Typography, Box, Grid, Chip, Avatar } from '@mui/material';
import { 
  Waves, 
  WbSunny, 
  Favorite, 
  DirectionsRun, 
  LocalDrink,
  SelfImprovement
} from '@mui/icons-material';

const WellnessRecommendations = ({ weather }) => {
  if (!weather) return null;

  const getWellnessRecommendations = (weatherCode, temp, humidity) => {
    const recommendations = {
      // Clear sky
      800: {
        ocean: "Perfect day for ocean activities! The clear sky makes it ideal for swimming, surfing, or beach yoga.",
        body: "Great conditions for outdoor exercise. Remember to stay hydrated and use sun protection.",
        wellness: "Practice mindful breathing in the fresh air. The ocean breeze is naturally calming.",
        activities: ["Beach Yoga", "Swimming", "Surfing", "Meditation by the Ocean"]
      },
      // Rain
      rain: {
        ocean: "The rain replenishes our oceans. Watch the beautiful interaction between rain and sea.",
        body: "Indoor exercises recommended. Focus on flexibility and strength training.",
        wellness: "Rain has a natural calming effect. Perfect for indoor meditation.",
        activities: ["Indoor Yoga", "Deep Breathing", "Stretching", "Mindfulness"]
      },
      // Clouds
      clouds: {
        ocean: "Moderate ocean conditions. Good for gentle water activities.",
        body: "Ideal temperature for outdoor workouts. Cloud cover provides natural protection.",
        wellness: "Practice grounding exercises connecting with nature.",
        activities: ["Light Swimming", "Beach Walking", "Tai Chi", "Ocean Meditation"]
      },
      // Snow
      snow: {
        ocean: "Observe the ocean's winter beauty. Cold water has unique health benefits.",
        body: "Focus on warming exercises. Consider indoor pool activities.",
        wellness: "Practice winter wellness routines. Cold exposure can boost immunity.",
        activities: ["Hot Yoga", "Indoor Swimming", "Breathing Exercises", "Wellness Rituals"]
      },
      // Thunderstorm
      thunderstorm: {
        ocean: "Appreciate ocean power from a safe distance. Watch the majestic waves.",
        body: "Indoor exercises recommended. Focus on gentle movement and stretching.",
        wellness: "Practice indoor meditation. Use the storm's energy for deep relaxation.",
        activities: ["Indoor Meditation", "Gentle Stretching", "Deep Breathing", "Relaxation"]
      }
    };

    // Determine the weather category
    let category;
    if (weatherCode === 800) category = 800;
    else if (weatherCode >= 200 && weatherCode < 300) category = 'thunderstorm';
    else if (weatherCode >= 300 && weatherCode < 600) category = 'rain';
    else if (weatherCode >= 600 && weatherCode < 700) category = 'snow';
    else if (weatherCode > 800) category = 'clouds';
    else category = 800; // Default to clear sky

    // Add temperature-based recommendations
    let tempRecommendation = "";
    if (temp > 30) {
      tempRecommendation = "High temperature alert! Stay hydrated and limit sun exposure.";
    } else if (temp < 10) {
      tempRecommendation = "Cold conditions. Warm up properly before any activity.";
    }

    // Add humidity-based recommendations
    let humidityRecommendation = "";
    if (humidity > 70) {
      humidityRecommendation = "High humidity. Take breaks and hydrate frequently.";
    } else if (humidity < 30) {
      humidityRecommendation = "Low humidity. Stay hydrated and moisturize.";
    }

    return {
      ...recommendations[category],
      temperature: tempRecommendation,
      humidity: humidityRecommendation
    };
  };

  const recommendations = getWellnessRecommendations(
    weather.weather[0].id,
    weather.main.temp,
    weather.main.humidity
  );

  return (
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
        <SelfImprovement /> Wellness Recommendations
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Waves /> Ocean Connection
            </Typography>
            <Typography variant="body1">{recommendations.ocean}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DirectionsRun /> Body Wellness
            </Typography>
            <Typography variant="body1">{recommendations.body}</Typography>
            {recommendations.temperature && (
              <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                {recommendations.temperature}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Favorite /> Mental Wellness
            </Typography>
            <Typography variant="body1">{recommendations.wellness}</Typography>
            {recommendations.humidity && (
              <Typography variant="body2" color="info.main" sx={{ mt: 1 }}>
                {recommendations.humidity}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WbSunny /> Recommended Activities
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {recommendations.activities.map((activity, index) => (
                <Chip
                  key={index}
                  label={activity}
                  color="primary"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WellnessRecommendations;
