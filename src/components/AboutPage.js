import React from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Divider
} from '@mui/material';
import {
  Waves,
  Favorite,
  WbSunny,
  SelfImprovement,
  WaterDrop,
  Opacity,
  Cloud,
  DirectionsRun
} from '@mui/icons-material';

const FeatureCard = ({ icon, title, description }) => (
  <Card sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const AboutPage = () => {
  const features = [
    {
      icon: <Waves />,
      title: "Ocean Connection",
      description: "Understand how weather patterns affect ocean conditions and learn the best times for ocean activities based on current weather."
    },
    {
      icon: <Favorite />,
      title: "Wellness Integration",
      description: "Receive personalized wellness recommendations that align with current weather conditions, promoting both physical and mental health."
    },
    {
      icon: <WbSunny />,
      title: "Weather Insights",
      description: "Access detailed weather forecasts with intuitive visualizations and practical recommendations for daily activities."
    },
    {
      icon: <SelfImprovement />,
      title: "Mind-Body Balance",
      description: "Find the perfect balance between indoor and outdoor activities with weather-appropriate wellness suggestions."
    },
    {
      icon: <DirectionsRun />,
      title: "Activity Recommendations",
      description: "Get tailored suggestions for physical activities that suit both the weather conditions and your wellness goals."
    },
    {
      icon: <WaterDrop />,
      title: "Ocean Health",
      description: "Learn about the relationship between weather patterns and ocean health, and how it affects our overall well-being."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About SFEIR Weather
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Where Weather Meets Wellness
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
            SFEIR Weather is more than just a weather app - it's your personal guide to maintaining wellness through weather awareness. 
            We believe in the profound connection between weather patterns, ocean health, and human well-being.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            To create a harmonious relationship between people and their environment by providing intelligent weather insights 
            that promote both personal wellness and environmental awareness. We emphasize the vital connection between ocean health 
            and human well-being, helping you make weather-smart decisions that benefit both.
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Key Features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Why Choose SFEIR Weather?
          </Typography>
          <Typography variant="body1" paragraph>
            Our unique approach combines accurate weather forecasting with wellness wisdom and ocean awareness. 
            We understand that weather isn't just about temperature and precipitation - it's about how atmospheric 
            conditions affect our bodies, minds, and the oceans we depend on.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Opacity color="primary" fontSize="large" />
            <Cloud color="primary" fontSize="large" />
            <WaterDrop color="primary" fontSize="large" />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
