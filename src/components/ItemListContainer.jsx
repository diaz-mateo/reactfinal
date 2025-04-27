// src/components/ItemListContainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../data/products';
import Item from './Item';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    getProducts(categoryId)
      .then(res => setProducts(res))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {categoryId ? `Categoría: ${categoryId}` : 'Catálogo completo'}
      </h2>
      <div className="d-flex flex-wrap justify-content-start">
        {products.map(p => (
          <Item key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;