// src/components/Brief.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Brief = ({ buyer, items, total, orderId }) => (
  <div className="container mt-5">
    <div className="alert alert-success" role="alert">
      <h2>¡Gracias por tu compra, {buyer.name}!</h2>
      <p>
        Se ha enviado un correo de confirmación a <strong>{buyer.email}</strong>.
      </p>
      {orderId && (
        <p>
          Tu número de orden es: <strong>{orderId}</strong>
        </p>
      )}
    </div>

    <h4 className="mt-4">Resumen de tu orden:</h4>
    <ul className="list-group mb-3">
      {items.map(item => (
        <li key={item.id} className="list-group-item d-flex justify-content-between">
          <span>{item.name} × {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </li>
      ))}
    </ul>
    <h5 className="fw-bold">Total: ${total}</h5>

    <Link to="/" className="btn btn-outline-primary mt-4">
      Volver al catálogo
    </Link>
  </div>
);

export default Brief;