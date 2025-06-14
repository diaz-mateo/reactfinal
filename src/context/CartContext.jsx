// src/context/CartContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Proveedor del contexto
export function CartProvider({ children }) {
  // Estado del carrito, con persistencia en localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 4. Agregar producto al carrito
  const addToCart = useCallback((product, qty = 1) => {
    if (!product?.id || !product?.name || !product?.price) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  }, []);

  // 5. Eliminar producto por ID
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // 6. Actualizar cantidad (y eliminar si es 0)
  const updateQuantity = useCallback(
    (id, qty) => {
      if (qty <= 0) {
        removeFromCart(id);
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          )
        );
      }
    },
    [removeFromCart]
  );

  // 7. Vaciar carrito
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // 8. Calcular total de dinero
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // 9. Calcular total de ítems
  const getTotalCount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // 10. Definir cartCount como acceso directo
  const cartCount = getTotalCount();

  // 11. Devolver el contexto
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalCount,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 12. Hook personalizado para acceder fácilmente
export const useCart = () => useContext(CartContext);