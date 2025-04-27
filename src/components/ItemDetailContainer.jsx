// src/components/ItemDetailContainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(itemId)
      .then(res => setProduct(res))
      .catch(err => console.error(err));
  }, [itemId]);

  if (!product) return <p className="m-4">Cargando producto...</p>;

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p className="lead">Precio: ${product.price}</p>
      <p>{product.description}</p>
      <div className="mt-3 d-flex">
        <button
          className="btn btn-success me-2"
          onClick={() => addToCart(product, 1)}
        >
          Agregar al carrito
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;