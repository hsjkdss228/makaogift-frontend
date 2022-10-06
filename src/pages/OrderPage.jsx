import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useOrderStore from '../hooks/useOrderStore';

import Order from '../components/Order';

export default function OrderPage() {
  const location = useLocation();

  const { product, selectedCount, totalCost } = location.state;

  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.initialize({
      product,
      purchaseCount: selectedCount,
      purchaseCost: totalCost,
    });
  }, []);

  return (
    <Order />
  );
}
