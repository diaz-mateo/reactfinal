import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Brief from './Brief';

const Checkout = () => {
  const { cartItems, cartCount } = useCart();
  const [buyer, setBuyer] = useState({ name: '', email: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleChange = e => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí podrías llamar a una API o generar un ID de orden
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return <Brief buyer={buyer} items={cartItems} total={total} />;
  }

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={buyer.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={buyer.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Finalizar Compra ({cartCount} ítems, Total: ${total})
        </button>
      </form>
    </div>
  );
};

export default Checkout;