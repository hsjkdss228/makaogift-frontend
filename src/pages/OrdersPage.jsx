import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Orders from '../components/Orders';
import useTransactionStore from '../hooks/useTransactionStore';

export default function OrdersPage() {
  const navigate = useNavigate();

  const transactionStore = useTransactionStore();

  useEffect(() => {
    // TODO: 새로고침하면 1페이지로 돌아가는 게 아니라 자신이 있는 페이지를 다시 로드하도록 해야 함
    //  useLocalStorage를 사용해볼 수 있을 것 같다.

    transactionStore.fetchTransactions(1);
    transactionStore.setCurrentPage(1);
  }, []);

  const { transactions, pagesCount, currentPage } = transactionStore;

  const navigateToOrderDetail = (transactionId) => {
    navigate(`/orders/${transactionId}`, {
      state: {
        orderId: transactionId,
      },
    });
  };

  const switchPage = (page) => {
    transactionStore.fetchTransactions(page);
    transactionStore.setCurrentPage(page);
  };

  return (
    <Orders
      transactions={transactions}
      pagesCount={pagesCount}
      currentPage={currentPage}
      onClickOrderDetail={navigateToOrderDetail}
      onClickPage={switchPage}
    />
  );
}
