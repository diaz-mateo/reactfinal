// src/components/ItemDetail.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ItemDetail = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (qty >= 1 && !isNaN(qty)) {
      addToCart(product, qty);
      setAdded(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <div className="row g-4">
          {/* Imagen cuadrada */}
          <div className="col-md-5 text-center">
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%', // Relación 1:1
                borderRadius: '8px',
                overflow: 'hidden',
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
          </div>

          {/* Información del producto */}
          <div className="col-md-7">
            <h2>{product.name}</h2>
            <p className="lead">Precio: ${product.price}</p>
            <p>{product.description}</p>

            <div className="d-flex align-items-center mb-3">
              <input
                type="number"
                className="form-control me-2"
                style={{ width: '6rem' }}
                min="1"
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                disabled={added}
              />
              <button
                className="btn btn-success"
                onClick={handleAdd}
                disabled={added}
              >
                {added ? 'Agregado ✔️' : 'Agregar al carrito'}
              </button>
            </div>

            {added && (
              <p className="text-success">Producto agregado correctamente al carrito.</p>
            )}

            <Link to="/" className="btn btn-outline-secondary mt-2">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;