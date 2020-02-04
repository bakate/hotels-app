import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/Bcg.jpg';

export default function Product({ image, title, id, price }) {
  return (
    <article className="product">
      <div className="img-container">
        <img src={image || logo} alt={title} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          Plus 🚀
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title}</p>
        <p className="product-price">{price}€/nuit</p>
      </div>
    </article>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
