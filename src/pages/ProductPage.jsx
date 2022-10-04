// import { useEffect } from 'react';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// import useProductStore from '../hooks/useProductStore';

import Product from '../components/Product';
import useProductStore from '../hooks/useProductStore';

export default function ProductPage() {
  const location = useLocation();

  const productId = location.state !== null
    ? location.state.productId
    : Number(location.pathname.split('/')[2]);

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProduct(productId);
  }, []);

  return (
    <Product />
  );
}
