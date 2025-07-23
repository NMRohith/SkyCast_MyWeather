# SkyCast - Find My Weather

> A responsive single-page React application that lets users enter a city name and view real-time weather using the OpenWeatherMap API.

---

## Date
23.07.2025

---

## Objective

To build a responsive React + Vite app that retrieves live weather data based on city input, demonstrating:
- Axios for API integration
- React Router DOM for navigation
- React Hooks for state and effect management
- Controlled components with validation
- Responsive styling using CSS

---

## Project Tasks

1. **Setup**
   - Initialize React app with Vite
   - Install dependencies:
     ```bash
     npm install axios react-router-dom
     ```

2. **Routing (App.jsx)**
   - Configure `BrowserRouter`
   - Create two routes:
     - `/` – Home page with input form
     - `/weather` – Results page displaying weather info

3. **Home Page (Home.jsx)**
   - Controlled input field
   - Input validation (not empty)
   - On form submit:
     - Store city name
     - Navigate to `/weather`

4. **Weather Page (Weather.jsx)**
   - Use Axios to call OpenWeatherMap API
   - Display:
     - Temperature (°C/°F via `useMemo`)
     - Humidity
     - Wind Speed
     - Weather Condition

5. **React Hooks**
   - `useState`, `useEffect`, `useCallback`, `useMemo`

6. **CSS Styling (App.css)**
   - Responsive layout
   - Styled form, buttons, weather card, navigation

---

## Technologies Used

- React + Vite
- Axios
- React Router DOM
- HTML & CSS

---
## Weather.jsx
```
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
```
## Home.jsx
```
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ city, setCity }) {
  const [input, setInput] = useState(city);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim() === '') {
      setError('City name cannot be empty.');
      return;
    }
    setError('');
    setCity(input);
    navigate('/weather');
  }, [input, navigate, setCity]);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
```
## App.jsx
```
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Weather from './Weather';
function App() {
  const [city, setCity] = useState('');
  return (
    <Routes>
      <Route path="/" element={<Home city={city} setCity={setCity} />} />
      <Route path="/weather" element={<Weather city={city} />} />
    </Routes>
  );
}
export default App;
```
## App.css
```
body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(145deg, #1e2a38, #263a4f);
  margin: 0;
  padding: 0;
  color: #eaeaea;
}

.container {
  max-width: 620px;
  margin: 50px auto;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #3f536e;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  text-align: left;
}

input {
  padding: 14px;
  width: 100%;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #fefefe;
  color: #1e2a38;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #2ecc71;
}

button {
  padding: 12px 30px;
  font-size: 16px;
  background: #2ecc71;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #27ae60;
}

.error {
  color: #e74c3c;
  font-weight: bold;
  margin-top: 10px;
}

.card {
  margin-top: 30px;
  padding: 25px;
  background: #2c3e50;
  border-left: 5px solid #3498db;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

```
## Output
<img width="1920" height="913" alt="Screenshot (68)" src="https://github.com/user-attachments/assets/bc61f675-24f0-4349-adec-c5b00d96f170" />
<img width="1920" height="910" alt="Screenshot (69)" src="https://github.com/user-attachments/assets/afe953b7-ef15-4c62-a4d2-66919156998a" />



## Result
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully.
