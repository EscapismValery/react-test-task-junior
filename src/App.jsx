import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<ProductsPage />}/>
          <Route path='/:productId' element={<ProductPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
