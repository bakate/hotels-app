import React, { useContext } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { ProductContext } from '../../context/products';
import ProductList from './ProductList';

export default function PaginatedProducts() {
  const { sorted, pages, changePage } = useContext(ProductContext);

  if (sorted[pages]) {
    return (
      <section>
        <ProductList products={sorted[pages]}></ProductList>

        {/* buttons */}
        {sorted.length > 1 && (
          <article className="pagination-buttons">
            {/* prev button */}
            {pages > 0 && (
              <button
                type="button"
                onClick={() => changePage(pages - 1)}
                className="prev-page-btn"
              >
                <FaAngleDoubleLeft />
              </button>
            )}
            {sorted.map((_, index) => (
              <button
                type="button"
                onClick={() => changePage(index)}
                key={index}
                className={`page-btn ${pages === index && `page-btn-current`}`}
              >
                {index + 1}
              </button>
            ))}
            {/* next button */}
            {pages < sorted.length - 1 && (
              <button
                type="button"
                onClick={() => changePage(pages + 1)}
                className="next-page-btn"
              >
                <FaAngleDoubleRight />
              </button>
            )}
          </article>
        )}
      </section>
    );
  }
  return (
    <h3 className="search-errors">
      malheureusement, on n'a pas de chambre qui correspond à ta recherche
    </h3>
  );
}
