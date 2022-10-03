import { useEffect } from 'react';

import useShopStore from '../hooks/useShopStore';

import Product from '../components/Product';

export default function ProductPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchProduct(1);
  }, []);

  return (
    <Product />
  );
}
