import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './components/layout/MainLayout';
import Home from './routes/Home';
import ShippingCalculator from './routes/ShippingCalculator';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shipping-calculator' element={<ShippingCalculator />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </StrictMode>,
)
