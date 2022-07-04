import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: false,
  setIsCartOpen: () => { },
  setCartItems: () => { }
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { cartItems, setCartItems, isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider