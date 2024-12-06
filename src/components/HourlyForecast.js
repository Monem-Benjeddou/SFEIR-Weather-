import React, { useRef, useEffect, useState } from 'react';
import { Box, Paper, Typography, useTheme, IconButton, CircularProgress } from '@mui/material';
import { 
  Thunderstorm, 
  WbSunny, 
  NightsStay,
  Cloud, 
  WaterDrop, 
  AcUnit, 
  Visibility,
  ChevronLeft,
  ChevronRight 
} from '@mui/icons-material';

const getWeatherIcon = (code) => {
  if (code >= 200 && code < 300) return <Thunderstorm />;
  if (code >= 300 && code < 600) return <WaterDrop />;
  if (code >= 600 && code < 700) return <AcUnit />;
  if (code >= 700 && code < 800) return <Visibility />;
  if (code === 800) {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? <WbSunny /> : <NightsStay />;
  }
  return <Cloud />;
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const HourlyForecast = ({ forecast, onLoadMore, loadingMore }) => {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isNearEnd, setIsNearEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = (e) => {
    const element = e.target;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;
    
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

    const scrollThreshold = scrollWidth - clientWidth - 100;
    const shouldLoadMore = scrollLeft >= scrollThreshold;
    
    if (shouldLoadMore && !isNearEnd && !loadingMore) {
      setIsNearEnd(true);
      onLoadMore?.();
    } else if (!shouldLoadMore && isNearEnd) {
      setIsNearEnd(false);
    }
  };

  const scroll = (direction) => {
    const element = scrollRef.current;
    if (element) {
      const scrollAmount = element.clientWidth * 0.8;
      element.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [forecast?.list?.[0]?.dt]);

  if (!forecast || !forecast.list) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 2,
        p: 1.5,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        position: 'relative',
        width: '100%',
      }}
    >
      <Typography variant="subtitle1" gutterBottom sx={{ ml: 1, mb: 1 }}>
        Hourly Forecast
      </Typography>

      {showLeftArrow && (
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
            zIndex: 2,
            boxShadow: 2,
          }}
          size="small"
        >
          <ChevronLeft />
        </IconButton>
      )}

      {showRightArrow && (
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
            zIndex: 2,
            boxShadow: 2,
          }}
          size="small"
        >
          <ChevronRight />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 1,
          pb: 1,
          px: 3,
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          width: '100%',
        }}
      >
        {forecast.list.map((hour) => (
          <Box
            key={hour.dt}
            sx={{
              minWidth: '70px',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              borderRadius: 1,
              transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
              '&:hover': !isDragging ? {
                transform: 'translateY(-2px)',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              } : {},
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {formatTime(hour.dt)}
            </Typography>
            
            <Box sx={{ 
              color: theme.palette.primary.main,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              '& > svg': {
                fontSize: '1.5rem'
              }
            }}>
              {getWeatherIcon(hour.weather[0].id)}
            </Box>
            
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {Math.round(hour.main.temp)}°
            </Typography>
          </Box>
        ))}
        
        {loadingMore && (
          <Box
            sx={{
              minWidth: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default HourlyForecast;
