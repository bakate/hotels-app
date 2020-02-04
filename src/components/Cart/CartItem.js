import React, { useContext } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { CartContext } from '../../context/cart';

export default function CartItem({ id, image, title, amount, price }) {
  const { removeItem, increaseAmount, decreaseAmount } = useContext(
    CartContext
  );
  return (
    <article className="cart-item">
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h3>{price}€/nuit</h3>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => {
            removeItem(id);
          }}
        >
          supprimer
        </button>
      </div>
      <div>
        <button
          type="button"
          className=" cart-btn amount-btn"
          onClick={() => {
            increaseAmount(id);
          }}
        >
          <FaAngleUp />
        </button>
        <p>{amount}</p>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            decreaseAmount(id, amount);
          }}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
}
