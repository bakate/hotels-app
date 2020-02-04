// cart context
import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import {
  REMOVE_ITEM,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  ADD_TO_CART,
  CLEAR_CART,
} from './actions';

const CartContext = React.createContext();

function getCartFromLocalStorage() {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // cart items
    const newCartItems = cart.reduce(
      (tally, cartItem) => (tally += cartItem.amount),
      0
    );
    setCartItems(newCartItems);
    // cart tally
    let newTotal = cart.reduce(
      (tally, cartItem) => (tally += cartItem.amount * cartItem.price),
      0
    );
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  // remove item
  const removeItem = id => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };
  // increase amount
  const increaseAmount = id => {
    dispatch({ type: INCREASE_AMOUNT, payload: id });
  };
  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      dispatch({ type: REMOVE_ITEM, payload: id });
    } else {
      dispatch({ type: DECREASE_AMOUNT, payload: id });
    }
  };
  // add to cart
  const addToCart = product => {
    const article = [...cart].find(item => item.id === product.id);
    if (article) {
      dispatch({ type: INCREASE_AMOUNT, payload: product.id });
    }
    dispatch({ type: ADD_TO_CART, payload: product });
  };
  const clearCart = () => dispatch({ type: CLEAR_CART });

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        clearCart,
        addToCart,
        decreaseAmount,
        increaseAmount,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { CartContext, CartProvider };
