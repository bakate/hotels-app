import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';
import Loading from '../components/Loading';

export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const product = products.find(item => item.id === parseInt(id));
  if (products.length === 0) {
    return <Loading />;
  }
  const { image, price, description, title } = product;
  return (
    <section className="single-product">
      <img src={image} alt={title} className="single-product-image" />
      <article>
        <h1>{title}</h1>
        <h2>{price}€/nuit</h2>
        <p>{description}</p>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => {
            // add to cart
            addToCart(product);
            history.push('/cart');
          }}
        >
          ajouter au panier
        </button>
      </article>
    </section>
  );
}
