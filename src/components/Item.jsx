import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Item = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card m-2 shadow-sm" style={{ width: '18rem' }}>
      {/* Imagen cuadrada 1:1 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%', // mantiene relación 1:1
          overflow: 'hidden',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="card-body d-flex flex-column justify-content-between">
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
    </div>
  );
};

export default Item;