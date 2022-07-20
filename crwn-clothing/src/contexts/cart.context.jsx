import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (existingItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  if (existingItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  } else {
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem);
  }
}

const deleteCartItem = (cartItems, productToDelete) => {
  const updatedCart = cartItems.filter((cartItem) => {
    return productToDelete.id !== cartItem.id
  });
  return updatedCart;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,
  cartTotal: 0,
  updateCartTotal: () => { }
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  }

  useEffect(() => {
    const cartCount = cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0);
    setCartCount(cartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => (total + cartItem.quantity * cartItem.price), 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider