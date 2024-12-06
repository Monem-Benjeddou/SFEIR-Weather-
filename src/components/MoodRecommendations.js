import React from 'react';
import { Box, Paper, Typography, Fade } from '@mui/material';
import { getRecommendations } from '../services/activityRecommendations';

const MoodRecommendations = ({ weatherData }) => {
  const recommendations = getRecommendations(weatherData);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textAlign: 'center',
          color: 'text.secondary',
          fontWeight: 500
        }}
      >
        Today's Recommendations
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {recommendations.map((rec, index) => (
          <Fade
            key={index}
            in={true}
            timeout={500}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                flex: '1 1 250px',
                maxWidth: '300px',
                textAlign: 'center',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
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
          </Fade>
        ))}
      </Box>
    </Box>
  );
};

export default MoodRecommendations;
