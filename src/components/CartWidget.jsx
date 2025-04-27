// src/components/CartWidget.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cartCount } = useCart();
  return (
    <Link to="/cart" className="d-flex align-items-center text-decoration-none">
      <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
      {cartCount > 0 && (
        <span className="badge bg-danger ms-1">{cartCount}</span>
      )}
    </Link>
  );
};

export default CartWidget;