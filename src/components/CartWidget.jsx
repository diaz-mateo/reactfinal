// src/components/CartWidget.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="d-flex align-items-center text-decoration-none position-relative"
      aria-label="Ir al carrito"
      title="Carrito"
    >
      <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
      {cartCount > 0 && (
        <span className="badge bg-danger ms-1 position-absolute top-0 start-100 translate-middle">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;