import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Cierra el menú automáticamente si se agranda la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Electrónica', path: '/category/electronica' },
    { label: 'Ropa', path: '/category/ropa' },
    { label: 'Libros', path: '/category/libros' },
  ];

  const activeStyle = {
    fontWeight: 'bold',
    color: '#4a90e2',
    borderBottom: '2px solid #4a90e2',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          Mi E-commerce
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`navbar-collapse ${menuOpen ? 'd-block' : 'd-none'} d-lg-flex`}>
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className="nav-link"
                  onClick={closeMenu}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;