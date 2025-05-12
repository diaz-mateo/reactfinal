import React from 'react';

const Brief = ({ buyer, items, total }) => (
  <div className="container mt-5">
    <h2>¡Gracias por tu compra, {buyer.name}!</h2>
    <p>Hemos enviado un correo de confirmación a <strong>{buyer.email}</strong>.</p>
    <h4 className="mt-4">Resumen de tu orden:</h4>
    <ul className="list-group mb-3">
      {items.map(item => (
        <li key={item.id} className="list-group-item d-flex justify-content-between">
          <span>{item.name} × {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </li>
      ))}
    </ul>
    <h5>Total: ${total}</h5>
  </div>
);

export default Brief;