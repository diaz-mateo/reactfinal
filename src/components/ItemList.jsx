// src/components/ItemList.jsx
import React from 'react';
import Item from './Item';

const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="m-4 text-muted">No hay productos disponibles en esta categoría.</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-start">
      {products.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;