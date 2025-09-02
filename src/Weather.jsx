import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!city) {
      console.log("No city found, redirecting to home");
      navigate('/');
      return;
    }
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("Fetching weather data for:", city);
    axios
      .get(url)
      .then((response) => {
        console.log("API Success:", response.data);
        setWeather(response.data);
        setError('');
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError('Failed to fetch weather data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city, navigate]);

  const fahrenheit = useMemo(() => {
    if (!weather) return null;
    return (weather.main.temp * 9) / 5 + 32;
  }, [weather]);
  return (
    <div className="container">
      <h1>Weather in {city}</h1>
      {loading ? (
        <p>Loading weather...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : weather ? (
        <div className="card">
          <p><strong>Temperature:</strong> {weather.main.temp}°C / {fahrenheit.toFixed(1)}°F</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Condition:</strong> {weather.weather[0].main}</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
      <button onClick={() => navigate('/')}>Search Another City</button>
    </div>
  );
}

export default Weather;
