// src/components/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Brief from './Brief';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, cartCount, getTotalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const total = getTotalPrice();

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError('Tu carrito está vacío.');
      return;
    }

    const order = {
      buyer,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      date: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error("Error al generar la orden:", err);
      setError('Ocurrió un error al generar tu orden. Inténtalo de nuevo.');
    }
  };

  if (orderId) {
    return <Brief buyer={buyer} items={cartItems} total={total} orderId={orderId} />;
  }

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {cartItems.length === 0 && !orderId && (
        <div className="alert alert-warning mt-3" role="alert">
          No hay productos en el carrito.{" "}
          <Link to="/" className="alert-link">Volver al catálogo</Link>.
        </div>
      )}

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
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={buyer.phone}
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
        <button type="submit" className="btn btn-primary" disabled={cartItems.length === 0}>
          Finalizar Compra ({cartCount} ítems, Total: ${total})
        </button>
      </form>
    </div>
  );
};

export default Checkout;