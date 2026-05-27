import React, { createContext } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';

export const ContextCartLists = createContext({});

export const CartItemsProvider = ({ children }) => {
  const [ProductCart, setProductCart] = useLocalStorage('ProductCart', []);

  const Total = () => {
    return ProductCart.reduce((sum, item) => {
      const qty = item.quantity || 1;
      return sum + item.price * qty;
    }, 0);
  };

  const subTotalValue = (total) => {
    const taxes = total * 0.05;
    return {
      subtotal: total - taxes,
      taxes,
    };
  };

  const CartQuantityIncrement = (name) => {
    setProductCart((prev) =>
      prev.map((item) =>
        item.ProductName === name
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
          : item
      )
    );
  };

  const CartQuantityDecrement = (name) => {
    setProductCart((prev) =>
      prev.map((item) =>
        item.ProductName === name
          ? { ...item, quantity: Math.max(1, item.quantity ? item.quantity - 1 : 1) }
          : item
      )
    );
  };

  const DeleteItems = (name) => {
    setProductCart((prev) => prev.filter((item) => item.ProductName !== name));
  };

  return (
    <ContextCartLists.Provider
      value={{
        ProductCart,
        setProductCart,
        Total,
        subTotalValue,
        CartQuantityIncrement,
        CartQuantityDecrement,
        DeleteItems,
      }}
    >
      {children}
    </ContextCartLists.Provider>
  );
};
