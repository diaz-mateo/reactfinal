import React, { useState } from 'react';

const ItemQuantitySelector = ({ max = 10, onChange }) => {
  const [qty, setQty] = useState(1);

  const handleInput = e => {
    const value = Math.max(1, Math.min(max, Number(e.target.value)));
    setQty(value);
    onChange(value);
  };

  return (
    <input
      type="number"
      className="form-control me-2"
      style={{ width: '4rem' }}
      min="1"
      max={max}
      value={qty}
      onChange={handleInput}
    />
  );
};

export default ItemQuantitySelector;