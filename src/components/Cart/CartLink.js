import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cart';

export default function CartLink() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-link-container">
      <Link to="/cart">Panier</Link>
      <span className="cart-link-total">{cartItems}</span>
    </div>
  );
}
