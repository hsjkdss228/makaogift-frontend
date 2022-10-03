import { useEffect } from 'react';

import useShopStore from '../hooks/useShopStore';

import Products from '../components/Products';

export default function ProductsPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchProducts();
  }, []);

  return (
    <Products />
  );
}
