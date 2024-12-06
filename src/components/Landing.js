import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import WeatherAnimation from './WeatherAnimation';

const Landing = () => {
  const navigate = useNavigate();
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <animated.div style={fadeIn}>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ mb: 4 }}>
              <WeatherAnimation weatherCode={800} description="clear sky" />
            </Box>
            
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 3
              }}
            >
              SFEIR Weather
            </Typography>

            <Typography 
              variant="h5" 
              color="textSecondary" 
              paragraph
              sx={{ mb: 4 }}
            >
              Your comprehensive weather companion. Get real-time updates,
              weekly forecasts, and detailed weather information for any location.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/weather')}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  }
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate('/about')}
                sx={{ px: 4, py: 1.5 }}
              >
                Learn More
              </Button>
            </Box>
          </Paper>
        </animated.div>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="textSecondary">
            Powered by OpenWeather API • Made with ❤️ by SFEIR
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Landing;
