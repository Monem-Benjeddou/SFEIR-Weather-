import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Navigation from './components/Navigation';
import WeatherPage from './components/WeatherPage';
import MeteoPage from './pages/MeteoPage';
import Landing from './components/Landing';
import WeatherGreeting from './components/WeatherGreeting';
import Globe from './components/Globe';
import AboutPage from './components/AboutPage';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

const ThemedApp = () => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.background,
          transition: 'background 0.3s ease-in-out',
        }}
      >
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={
              <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
                <WeatherGreeting />
                <Box sx={{ mt: 4 }}>
                  <Landing />
                </Box>
              </Box>
            } />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/globe" element={<Globe />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </Box>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
