// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de importar tu CSS
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // Importa el CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* Asegúrate de envolver toda la aplicación con CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);