import { useEffect } from 'react';

import useProductStore from '../hooks/useProductStore';

import Products from '../components/Products';

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
    productStore.resetCountAndCost();
  }, []);

  return (
    <Products />
  );
}
