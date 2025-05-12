import React from 'react';
import Description from './Description';
import ItemQuantitySelector from './ItemQuantitySelector';
import AddItemButton from './AddItemButton';

const ItemDetail = ({ product, onAdd }) => {
  const handleAdd = qty => {
    onAdd(product, qty);
  };

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p className="lead">Precio: ${product.price}</p>
      <Description text={product.description} />
      <div className="d-flex align-items-center mt-3">
        <ItemQuantitySelector max={10} onChange={() => {}} refSelect={elem => {}} />
        <AddItemButton onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default ItemDetail;