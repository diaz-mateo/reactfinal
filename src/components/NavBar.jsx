// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div className="container">
      <NavLink className="navbar-brand" to="/">
        Mi E-commerce
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/category/electronica">
              Electrónica
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/category/ropa">
              Ropa
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/category/libros">
              Libros
            </NavLink>
          </li>
        </ul>
        <CartWidget />
      </div>
    </div>
  </nav>
);

export default NavBar;