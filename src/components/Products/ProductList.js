import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

export default function ProductList({ title, products }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="products-center">
        {products.map(item => (
          <Product key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
