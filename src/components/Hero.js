import React from 'react';
import PropTypes from 'prop-types';

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>Des vacances de rêve ?</h1>
        <p>
          Nous te fournissons les meilleures chambres pour un séjour inoubliable
        </p>
        {children}
      </div>
    </div>
  );
}

Hero.propTypes = {
  children: PropTypes.object,
};
