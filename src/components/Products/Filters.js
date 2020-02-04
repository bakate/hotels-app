import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';

export default function Filters() {
  const {
    filters: { search, category, pets, price },
    updateFilters,
    sorted,
  } = useContext(ProductContext);
  return (
    <section className="filters-section">
      <h2 className="section-title">Rechercher un article</h2>
      <form className="filters-form">
        <div>
          {/* search input */}
          <div className="form-group">
            <label htmlFor="search">Cherche une chambre</label>
            <input
              type="text"
              name="search"
              id="search"
              className="form-control"
              value={search}
              onChange={updateFilters}
            />
          </div>
          {/* end of search form */}
          {/* select category */}
          <div className="form-group">
            <label htmlFor="category">catégories</label>
            <select
              name="category"
              id="category"
              className="form-control"
              value={category}
              onChange={updateFilters}
            >
              <option value="all">Toutes les chambres</option>
              <option value="paris">Paris</option>
              <option value="new-york">New-York</option>
              <option value="los angeles">Los Angeles</option>
              <option value="dakar">Dakar</option>
            </select>
          </div>
          {/* end of category */}
          {/* free shipping */}
          <div className="form-group">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={updateFilters}
            />
            <label htmlFor="pets">Animaux autorisés</label>
          </div>
          {/* end of free shipping */}
        </div>
        {/* price */}
        <div className="price-group">
          <p>prix</p>
          <label>
            <input
              type="radio"
              name="price"
              id="all"
              value="all"
              checked={price === 'all'}
              onChange={updateFilters}
            />
            tout
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="0"
              checked={price === 0}
              onChange={updateFilters}
            />
            0 - 300€ la nuit
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="300"
              checked={price === 300}
              onChange={updateFilters}
            />
            300 - 500€ la nuit
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="500"
              checked={price === 500}
              onChange={updateFilters}
            />
            plus de 500€ la nuit
          </label>
        </div>
        {/* end of price */}
      </form>
      <h6>Nombre de chambres :{sorted.flat().length} </h6>
      <hr />
    </section>
  );
}
