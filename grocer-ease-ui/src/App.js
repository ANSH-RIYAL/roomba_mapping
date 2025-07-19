
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import StaffPage from './pages/StaffPage';
import CheckoutPage from './pages/CheckoutPage';
import FloorplanPage from './pages/FloorplanPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/floorplan" element={<FloorplanPage />} />
      </Routes>
    </div>
  );
}

export default App;
