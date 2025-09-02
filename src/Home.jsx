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
