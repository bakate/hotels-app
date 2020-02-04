import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';
import Loading from '../Loading';

export default function FeaturedProducts() {
  const { loading, featured } = useContext(ProductContext);
  return loading ? (
    <Loading />
  ) : (
    <ProductList title="les nouveautés" products={featured} />
  );
}
