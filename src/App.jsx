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