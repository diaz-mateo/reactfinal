import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart
  } = useCart();

  const [orderId, setOrderId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleProcess = async () => {
    setProcessing(true);

    const order = {
      buyer: {
        name: 'Usuario anónimo',
        email: 'anonimo@example.com'
      },
      items: cartItems.map(item => ({
        id: item.id,
        title: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: getTotalPrice(),
      date: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Hubo un problema al procesar tu compra.');
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0 && !orderId) {
    return (
      <div className="container mt-5 text-center">
        <h2>Tu carrito está vacío.</h2>
        <Link to="/" className="btn btn-outline-primary mt-3">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Mi Carrito</h2>

      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <div className="flex-grow-1 me-3">
              <h5>{item.name}</h5>
              <p>Precio unitario: ${item.price}</p>
              <p className="text-muted">Subtotal: ${item.price * item.quantity}</p>
            </div>

            <div className="d-flex align-items-center">
              <label className="me-2 mb-0">Cantidad:</label>
              <input
                type="number"
                min="1"
                className="form-control me-2"
                style={{ width: '5rem' }}
                value={item.quantity}
                disabled={processing || orderId}
                onChange={e => updateQuantity(item.id, Number(e.target.value))}
              />

              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
                disabled={processing || orderId}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Total: ${getTotalPrice()}</strong>
        <div>
          <button
            className="btn btn-outline-danger me-2"
            onClick={clearCart}
            disabled={processing || orderId}
          >
            Vaciar carrito
          </button>
          <button
            className="btn btn-primary"
            onClick={handleProcess}
            disabled={processing || orderId}
          >
            {processing ? 'Procesando...' : 'Procesar compra'}
          </button>
        </div>
      </div>

      {orderId && (
        <div className="alert alert-success mt-4" role="alert">
          <strong>¡Gracias!</strong> Tu compra ha sido procesada correctamente. <br />
          ID de orden: <code>{orderId}</code>
        </div>
      )}
    </div>
  );
};

export default Cart;