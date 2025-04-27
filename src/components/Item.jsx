// src/components/Item.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Item = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card m-2 p-3" style={{ width: '18rem' }}>
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">Precio: ${product.price}</p>
      <div className="d-flex justify-content-between">
        <Link to={`/item/${product.id}`} className="btn btn-outline-primary">
          Ver detalle
        </Link>
        <button
          className="btn btn-success"
          onClick={() => addToCart(product, 1)}
        >
          + Carrito
        </button>
      </div>
    </div>
  );
};

export default Item;