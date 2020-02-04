import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Oops! tu fais du hors piste</h1>
        <Link to="/" className="btn btn-primary">
          Revenir à l'accueil
        </Link>
      </div>
    </section>
  );
}
