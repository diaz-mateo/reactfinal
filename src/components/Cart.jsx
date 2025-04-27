// src/components/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  // Estado para controlar la confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Total acumulado
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Manejador del botón "Procesar items"
  const handleProcess = () => {
    setShowConfirmation(true);
    // Aquí podrías, por ejemplo, vaciar el carrito o llamar a una API
  };

  if (cartItems.length === 0) {
    return <p className="m-4">Tu carrito está vacío.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Mi Carrito</h2>
      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex align-items-center"
          >
            <div className="flex-grow-1">
              <h5>{item.name}</h5>
              <p>Precio unitario: ${item.price}</p>
            </div>
            <div className="d-flex align-items-center">
              <input
                type="number"
                min="1"
                value={item.quantity}
                className="form-control me-2"
                style={{ width: '4rem' }}
                onChange={e =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Botón para procesar items */}
      <div className="d-flex justify-content-between align-items-center">
        <strong>Total: ${total}</strong>
        <button
          className="btn btn-primary"
          onClick={handleProcess}
        >
          Procesar items
        </button>
      </div>

      {/* Alert de confirmación */}
      {showConfirmation && (
        <div
          className="alert alert-success alert-dismissible fade show mt-4"
          role="alert"
        >
          <strong>¡Éxito!</strong> Items comprados.  
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowConfirmation(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Cart;