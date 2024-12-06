export const mockWeatherData = {
  paris: {
    name: "Paris",
    sys: { country: "FR" },
    weather: [{ id: 800, description: "Clear sky" }],
    main: {
      temp: 22,
      feels_like: 21,
      humidity: 65,
      pressure: 1012
    },
    wind: { speed: 3.6 }
  },
  london: {
    name: "London",
    sys: { country: "GB" },
    weather: [{ id: 500, description: "Light rain" }],
    main: {
      temp: 18,
      feels_like: 17,
      humidity: 78,
      pressure: 1008
    },
    wind: { speed: 4.2 }
  },
  newyork: {
    name: "New York",
    sys: { country: "US" },
    weather: [{ id: 801, description: "Few clouds" }],
    main: {
      temp: 25,
      feels_like: 26,
      humidity: 60,
      pressure: 1015
    },
    wind: { speed: 5.1 }
  },
  tokyo: {
    name: "Tokyo",
    sys: { country: "JP" },
    weather: [{ id: 300, description: "Light drizzle" }],
    main: {
      temp: 28,
      feels_like: 30,
      humidity: 75,
      pressure: 1010
    },
    wind: { speed: 2.8 }
  },
  sydney: {
    name: "Sydney",
    sys: { country: "AU" },
    weather: [{ id: 200, description: "Thunderstorm" }],
    main: {
      temp: 26,
      feels_like: 28,
      humidity: 70,
      pressure: 1009
    },
    wind: { speed: 6.2 }
  }
};
