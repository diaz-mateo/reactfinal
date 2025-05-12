import React from 'react';

const AddItemButton = ({ onAdd }) => (
  <button
    className="btn btn-success"
    onClick={() => onAdd()}
  >
    Agregar al carrito
  </button>
);

export default AddItemButton;