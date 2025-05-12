import React from 'react';
import Item from './Item';

const ItemList = ({ products }) => {
  return (
    <div className="d-flex flex-wrap justify-content-start">
      {products.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;