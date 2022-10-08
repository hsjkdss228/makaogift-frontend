import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useTransactionStore from '../hooks/useTransactionStore';

import OrderDetail from '../components/OrderDetail';

export default function OrderDetailPage() {
  const location = useLocation();

  const orderId = location.state !== null
    ? location.state.orderId
    : Number(location.pathname.split('/')[2]);

  const transactionStore = useTransactionStore();

  useEffect(() => {
    transactionStore.fetchTransaction(orderId);
  }, []);

  return (
    <OrderDetail
      transaction={transactionStore.transaction}
    />
  );
}
