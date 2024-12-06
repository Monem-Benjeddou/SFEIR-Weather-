import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [weatherCondition, setWeatherCondition] = useState('clear');

  const getThemeByWeather = (condition) => {
    const themes = {
      clear: {
        light: {
          primary: { main: '#2196F3' },
          secondary: { main: '#FFA726' },
          background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
          text: { primary: '#1A237E', secondary: '#424242' }
        },
        dark: {
          primary: { main: '#90CAF9' },
          secondary: { main: '#FFB74D' },
          background: 'linear-gradient(120deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          text: { primary: '#E3F2FD', secondary: '#B0BEC5' }
        }
      },
      rain: {
        light: {
          primary: { main: '#4FC3F7' },
          secondary: { main: '#78909C' },
          background: 'linear-gradient(to bottom, #E1F5FE 0%, #B3E5FC 100%)',
          text: { primary: '#1A237E', secondary: '#424242' }
        },
        dark: {
          primary: { main: '#81D4FA' },
          secondary: { main: '#90A4AE' },
          background: 'linear-gradient(to bottom, #1A237E 0%, #0D47A1 100%)',
          text: { primary: '#E3F2FD', secondary: '#B0BEC5' }
        }
      },
      clouds: {
        light: {
          primary: { main: '#90A4AE' },
          secondary: { main: '#78909C' },
          background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
          text: { primary: '#263238', secondary: '#424242' }
        },
        dark: {
          primary: { main: '#B0BEC5' },
          secondary: { main: '#90A4AE' },
          background: 'linear-gradient(135deg, #37474F 0%, #263238 100%)',
          text: { primary: '#ECEFF1', secondary: '#B0BEC5' }
        }
      },
      snow: {
        light: {
          primary: { main: '#B3E5FC' },
          secondary: { main: '#90A4AE' },
          background: 'linear-gradient(to bottom, #E0F7FA 0%, #B2EBF2 100%)',
          text: { primary: '#0D47A1', secondary: '#424242' }
        },
        dark: {
          primary: { main: '#81D4FA' },
          secondary: { main: '#B0BEC5' },
          background: 'linear-gradient(to bottom, #1A237E 0%, #0D47A1 100%)',
          text: { primary: '#E1F5FE', secondary: '#B0BEC5' }
        }
      },
      thunderstorm: {
        light: {
          primary: { main: '#7E57C2' },
          secondary: { main: '#FFB74D' },
          background: 'linear-gradient(to bottom, #5C6BC0 0%, #3949AB 100%)',
          text: { primary: '#E8EAF6', secondary: '#C5CAE9' }
        },
        dark: {
          primary: { main: '#9575CD' },
          secondary: { main: '#FFA726' },
          background: 'linear-gradient(to bottom, #1A237E 0%, #311B92 100%)',
          text: { primary: '#E8EAF6', secondary: '#C5CAE9' }
        }
      }
    };

    return themes[condition] || themes.clear;
  };

  const theme = createTheme({
    palette: {
      mode,
      ...getThemeByWeather(weatherCondition)[mode],
      background: {
        default: getThemeByWeather(weatherCondition)[mode].background,
        paper: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const updateWeatherTheme = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) {
      setWeatherCondition('thunderstorm');
    } else if (weatherCode >= 300 && weatherCode < 600) {
      setWeatherCondition('rain');
    } else if (weatherCode >= 600 && weatherCode < 700) {
      setWeatherCondition('snow');
    } else if (weatherCode >= 700 && weatherCode < 800) {
      setWeatherCondition('clouds');
    } else if (weatherCode === 800) {
      setWeatherCondition('clear');
    } else if (weatherCode > 800) {
      setWeatherCondition('clouds');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, updateWeatherTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
