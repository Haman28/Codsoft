import React, { createContext, useState, useContext, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    if (!food || !food.id || !food.price) {
      console.error("Invalid food item:", food);
      return;
    }
    const existingItem = cart.find((item) => item.id === food.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const removeFromCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== food.id);
      }
    });
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};