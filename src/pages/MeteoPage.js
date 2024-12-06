import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Container, Box, Paper, Typography, CircularProgress } from '@mui/material';

const MeteoPage = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const globeRef = useRef(null);
  const markerRef = useRef(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debug environment variables
  useEffect(() => {
    const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;
    const opencageKey = process.env.REACT_APP_OPENCAGE_API_KEY;
    
    console.log('Environment Variables Check:');
    console.log('Weather API Key:', weatherKey ? 'Present' : 'Missing');
    console.log('OpenCage API Key:', opencageKey ? 'Present' : 'Missing');
    
    if (!weatherKey || !opencageKey) {
      console.error('Missing API keys. Please check your .env file and restart the development server.');
    }
  }, []);

  const cartesianToLatLong = (point) => {
    const normalized = point.normalize();
    const lat = 90 - Math.acos(normalized.y) * (180 / Math.PI);
    const lng = ((Math.atan2(normalized.z, normalized.x) * 180 / Math.PI) + 180) % 360 - 180;
    return { lat, lng };
  };

  const getLocationName = async (lat, lng) => {
    const opencageKey = process.env.REACT_APP_OPENCAGE_API_KEY;
    
    if (!opencageKey) {
      console.error('OpenCage API key is missing');
      throw new Error('OpenCage API key is missing. Please check your .env file and restart the development server.');
    }

    const params = new URLSearchParams({
      q: `${lat},${lng}`,
      key: opencageKey,
      language: 'en',
      pretty: '1'
    });

    const url = `https://api.opencagedata.com/geocode/v1/json?${params}`;
    console.log('Fetching location data from:', url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('OpenCage API Response:', data);
      
      if (!data.results || data.results.length === 0) {
        console.warn('No results found for coordinates:', { lat, lng });
        return { city: 'Unknown Location', country: '' };
      }

      const result = data.results[0];
      const components = result.components || {};
      
      const city = 
        components.city ||
        components.town ||
        components.village ||
        components.county ||
        components.state_district ||
        components.state ||
        'Unknown Location';

      const country = components.country || '';
      
      console.log('Extracted location:', { city, country });
      return { city, country };
    } catch (error) {
      console.error('OpenCage API Error:', error);
      return { city: 'Unknown Location', country: '' };
    }
  };

  const fetchWeather = async (lat, lng) => {
    const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;
    
    if (!weatherKey) {
      throw new Error('Weather API key is missing. Please check your .env file and restart the development server.');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Weather API Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Initialize scene
    sceneRef.current = new THREE.Scene();
    
    // Set up camera
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current.position.z = 2;

    // Set up renderer
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(width, height);
    mountRef.current.appendChild(rendererRef.current.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    sceneRef.current.add(directionalLight);

    // Create globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('http://localhost:3000/earth_texture.jpg'),
      bumpScale: 0.05,
      specular: new THREE.Color('grey'),
      shininess: 10
    });
    globeRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(globeRef.current);

    // Set up controls
    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 1.5;
    controls.maxDistance = 4;

    // Add click event listener
    const handleClick = async (event) => {
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObject(globeRef.current);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        const coords = cartesianToLatLong(point);
        
        console.log('Clicked coordinates:', coords);
        setLoading(true);
        setError(null);

        try {
          // First try to get the weather data
          const weatherData = await fetchWeather(coords.lat, coords.lng);
          console.log('Weather data:', weatherData);
          setWeather(weatherData);

          // Then try to get the location name
          const locationData = await getLocationName(coords.lat, coords.lng);
          console.log('Location data:', locationData);
          
          if (locationData.city === 'Unknown Location' && weatherData.name) {
            // Use weather data location if OpenCage fails
            setLocation({
              city: weatherData.name,
              country: weatherData.sys?.country || ''
            });
          } else {
            setLocation(locationData);
          }
        } catch (error) {
          console.error('API error:', error);
          setError(error.message);
          setWeather(null);
          setLocation(null);
        } finally {
          setLoading(false);
        }
      }
    };

    rendererRef.current.domElement.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      rendererRef.current.domElement.removeEventListener('click', handleClick);
      mountRef.current.removeChild(rendererRef.current.domElement);
      sceneRef.current.remove(globeRef.current);
      geometry.dispose();
      material.dispose();
      rendererRef.current.dispose();
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Interactive Weather Globe
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Globe Container */}
        <Box
          ref={mountRef}
          sx={{
            flex: 2,
            height: '600px',
            backgroundColor: '#000',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        />

        {/* Weather Info Container */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Weather Information
            </Typography>
            
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            )}
            
            {error && (
              <Typography color="error" sx={{ py: 2 }}>
                {error}
              </Typography>
            )}
            
            {weather && !loading && (
              <>
                <Typography variant="h5" paragraph sx={{ color: 'primary.main' }}>
                  {location ? `${location.city}${location.country ? `, ${location.country}` : ''}` : weather.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  Temperature: {Math.round(weather.main.temp)}°C
                </Typography>
                <Typography variant="body1" paragraph>
                  Weather: {weather.weather[0].main} - {weather.weather[0].description}
                </Typography>
                <Typography variant="body1" paragraph>
                  Humidity: {weather.main.humidity}%
                </Typography>
                <Typography variant="body1" paragraph>
                  Wind Speed: {weather.wind.speed} m/s
                </Typography>
              </>
            )}
            
            {!weather && !loading && !error && (
              <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                Click anywhere on the globe to see weather information
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default MeteoPage;
