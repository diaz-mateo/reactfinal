// src/components/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Brief from './Brief';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
  const { cartItems, cartCount, getTotalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });
  const [orderId, setOrderId] = useState(null);

  const total = getTotalPrice();

  const handleChange = e => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error("Error al generar la orden:", error);
      alert("Ocurrió un error al generar tu orden. Inténtalo de nuevo.");
    }
  };

  // Mostrar resumen si la orden se generó
  if (orderId) {
    return <Brief buyer={buyer} items={cartItems} total={total} orderId={orderId} />;
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
        <button type="submit" className="btn btn-primary">
          Finalizar Compra ({cartCount} ítems, Total: ${total})
        </button>
      </form>
    </div>
  );
};

export default Checkout;