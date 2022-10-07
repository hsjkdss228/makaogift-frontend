import { useEffect } from 'react';

import Orders from '../components/Orders';
import useTransactionStore from '../hooks/useTransactionStore';

export default function OrdersPage() {
  const transactionStore = useTransactionStore();

  useEffect(() => {
    // TODO: 새로고침하면 1페이지로 돌아가는 게 아니라 자신이 있는 페이지를 다시 로드하도록 해야 함
    //  useLocalStorage를 사용해볼 수 있을 것 같다.

    transactionStore.fetchTransactions(1);
  }, []);

  return (
    <Orders />
  );
}
