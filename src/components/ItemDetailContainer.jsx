import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(itemId)
      .then(res => setProduct(res))
      .catch(err => console.error(err));
  }, [itemId]);

  const handleAdd = (product, qty) => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (!product) return <p className="m-4">Cargando producto...</p>;

  return <ItemDetail product={product} onAdd={handleAdd} />;
};

export default ItemDetailContainer;