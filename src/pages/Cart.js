import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
// import {UserContext} from '../context/user'

export default function Cart() {
  const { cart, total } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const items = cart.map(item => <CartItem key={item.id} {...item} />);
  const isLogged = user && user.token ? 'commander' : 'connexion';
  return !cart.length ? (
    <EmptyCart />
  ) : (
    <section className="cart-items section">
      <h2>Ton panier</h2>
      {items}
      <h2>total: {total}€</h2>

      <Link to={`/${isLogged}`} className="btn btn-primary btn-block">
        {isLogged}
      </Link>
    </section>
  );
}
