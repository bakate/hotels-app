import React, { useContext } from 'react';
import Loading from '../components/Loading';
import { ProductContext } from '../context/products';
import PageProducts from '../components/Products/PageProducts';
import Filters from '../components/Products/Filters';

export default function Products() {
  const { loading } = useContext(ProductContext);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Filters />
      <PageProducts />
    </>
  );
}
