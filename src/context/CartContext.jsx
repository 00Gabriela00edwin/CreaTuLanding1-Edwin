import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    const itemToAdd = { ...item, quantity };
    const index = cart.findIndex(prod => prod.id === item.id);

    if (index > -1) {
      const newCart = [...cart];
      newCart[index].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, itemToAdd]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(prod => prod.id !== id));
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some(prod => prod.id === id);
  };

  const totalQuantity = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  const totalPrice = () => {
    return cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
  };

  const contextValue = {
    cart,
    addItem,
    removeItem,
    clear,
    isInCart,
    totalQuantity,
    totalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
