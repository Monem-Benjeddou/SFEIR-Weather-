# SFEIR Weather App

A modern, interactive weather application that provides real-time weather updates, forecasts, and personalized recommendations based on current weather conditions.

## Features

- **Real-time Weather Updates**: Get current weather conditions for any location
- **Interactive 3D Globe**: Click anywhere on the globe to check weather conditions
- **Personalized Recommendations**: Receive activity suggestions based on weather
- **Detailed Forecasts**: View hourly and weekly weather forecasts
- **Weather Animations**: Beautiful weather animations for different conditions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_OPENCAGE_API_KEY=your_opencage_api_key
```

2. Get your API keys from:
- [OpenWeather API](https://openweathermap.org/api)
- [OpenCage Geocoding API](https://opencagedata.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/SFEIR-Weather-.git
```

2. Navigate to the project directory:
```bash
cd SFEIR-Weather-
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Features in Detail

### Weather Greeting
- Personalized greetings based on time of day
- Current weather conditions and temperature
- Activity recommendations based on weather

### Interactive Globe
- 3D interactive Earth visualization
- Click-to-check weather anywhere
- Smooth animations and transitions

### Weather Display
- Current temperature and conditions
- Feels like temperature
- Humidity and wind speed
- Atmospheric pressure

### Forecasts
- Hourly weather predictions
- 7-day weather forecast
- Detailed weather parameters

## Technologies Used

- React.js
- Material-UI
- Three.js
- React Spring
- OpenWeather API
- OpenCage Geocoding API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by OpenWeather
- Geocoding services by OpenCage
- Made with ❤️ by SFEIR