// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Página 404 si la ruta no existe */}
        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h2>404 - Página no encontrada</h2>
              <p>La ruta que intentaste acceder no existe.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;