import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import useOrderStore from '../hooks/useOrderStore';

import Order from '../components/Order';
import useUserStore from '../hooks/useUserStore';

export default function OrderPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { product, selectedCount, totalCost } = location.state;

  const orderStore = useOrderStore();
  const userStore = useUserStore();

  useEffect(() => {
    orderStore.initialize({
      product,
      purchaseCount: selectedCount,
      purchaseCost: totalCost,
    });
  }, []);

  const {
    receiver, address, messageToSend, errorCodesAndMessages,
  } = orderStore;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderId = await orderStore.order();

    if (orderId) {
      userStore.fetchUserAmount();
      navigate('/orders');
    }
  };

  return (
    <Order
      product={product}
      purchaseCount={selectedCount}
      purchaseCost={totalCost}
      receiver={receiver}
      address={address}
      messageToSend={messageToSend}
      errors={errorCodesAndMessages}
      onSubmit={handleSubmit}
    />
  );
}
