import React from "react";

const WeatherPanel = ({ locationName, weatherData, countryInfo }) => (
  <div className="weather-panel">
    <div className="panel-content">
      <h2 id="location-name">{locationName || "Select a location"}</h2>
      {countryInfo && (
        <div id="country-info" className="country-info">
          <p><strong>Capital:</strong> {countryInfo.capital}</p>
          <p><strong>Population:</strong> {countryInfo.population}</p>
          <p><strong>Region:</strong> {countryInfo.region}</p>
          <p><strong>Languages:</strong> {countryInfo.languages.join(", ")}</p>
        </div>
      )}
      {weatherData && (
        <div id="weather-info" className="weather-info">
          <div className="weather-item">
            <span className="label">Temperature:</span>
            <span id="temperature">{weatherData.temperature}°C</span>
          </div>
          <div className="weather-item">
            <span className="label">Weather:</span>
            <span id="weather-description">{weatherData.description}</span>
          </div>
          <div className="weather-item">
            <span className="label">Humidity:</span>
            <span id="humidity">{weatherData.humidity}%</span>
          </div>
          <div className="weather-item">
            <span className="label">Wind Speed:</span>
            <span id="wind-speed">{weatherData.windSpeed} km/h</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default WeatherPanel;
