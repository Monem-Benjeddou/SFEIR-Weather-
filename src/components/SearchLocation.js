import React, { useState, useEffect, useRef } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box,
  List,
  ListItem,
  ListItemText,
  Popper,
  ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchLocation = ({ onLocationSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchTimeoutRef = useRef(null);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.map(city => ({
        name: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`,
        lat: city.lat,
        lon: city.lon
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (input.length >= 3) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(input);
      }, 300);
    } else {
      setSuggestions([]);
    }
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setAnchorEl(e.currentTarget);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    onLocationSelect(suggestion);
    setAnchorEl(null);
    setSuggestions([]);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && suggestions.length > 0;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ width: '100%', maxWidth: 400, position: 'relative' }}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: 20,
            boxShadow: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a city..."
            inputProps={{ 
              'aria-label': 'search for a city',
              'role': 'searchbox'
            }}
            value={input}
            onChange={handleInputChange}
          />
          <IconButton 
            type="submit" 
            sx={{ p: '10px' }} 
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{
            width: anchorEl?.offsetWidth,
            zIndex: 1000,
          }}
        >
          <Paper sx={{ mt: 1, maxHeight: 300, overflow: 'auto' }}>
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText primary={suggestion.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchLocation;
