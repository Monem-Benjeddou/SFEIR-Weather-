import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const handleLocationSelect = (lat, lon, locationData) => {
  console.log('Location selected:', { lat, lon, locationData });
  return locationData;
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

export const getForecastData = async (lat, lon) => {
  try {
    // Use the 5 day / 3 hour forecast endpoint
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    // Log the structure of the response
    console.log('Forecast data received:', {
      listLength: response.data.list?.length,
      firstItem: response.data.list?.[0],
      lastItem: response.data.list?.[response.data.list?.length - 1],
      timeSpan: response.data.list?.[response.data.list?.length - 1]?.dt - response.data.list?.[0]?.dt
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};
