// products context
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  // extra state values
  const [sorted, setSorted] = useState([]);
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    pets: false,
    price: 'all',
  });
  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(response => {
      const isFeatured = featuredProducts(flattenProducts(response.data));
      const productsTransformed = flattenProducts(response.data);
      setSorted(paginate(productsTransformed));
      setProducts(productsTransformed);
      setFeatured(isFeatured);
      setLoading(false);
    });
    return () => {};
  }, []);
  function changePage(index) {
    setPages(index);
  }
  function updateFilters(e) {
    const { type } = e.target;
    const filter = e.target.name;
    const { value } = e.target;
    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
  }

  useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, pets, price } = filters;
    //
    if (category !== 'all') {
      newProducts = newProducts.filter(item => item.category === category);
    }
    if (pets !== false) {
      newProducts = newProducts.filter(item => item.pets_allowed === pets);
    }
    if (price !== 'all') {
      newProducts = newProducts.filter(item => {
        if (price === 0) {
          return item.price < 300;
        }
        if (price === 300) {
          return item.price > 300 && item.price < 500;
        }
        return item.price > 500;
      });
    }
    if (search !== '') {
      newProducts = newProducts.filter(item => {
        const title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    setPages(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);
  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        featured,
        sorted,
        pages,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { ProductProvider, ProductContext };
