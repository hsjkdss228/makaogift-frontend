// import { useNavigate } from 'react-router-dom';

import useTransactionStore from '../hooks/useTransactionStore';

export default function Orders() {
  // const navigate = useNavigate();

  const transactionStore = useTransactionStore();

  const { transactions, pagesCount } = transactionStore;

  const handleProductClick = (transactionId) => {
    // navigate(`/orders/${transactionId}`, {
    //   state: {
    //     orderId: transcationId,
    //   },
    // });
  };

  const handlePageClick = (page) => {
    transactionStore.fetchTransactions(page);
  };

  const renderPageButtons = () => {
    const iterator = Array(pagesCount).fill(0).map((_, index) => index + 1);

    return iterator.map((page) => (
      <li key={page}>
        <button
          type="button"
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      </li>
    ));
  };

  return (
    <article>
      {!transactions.length ? (
        <p>내가 주문한 내역이 없습니다</p>
      ) : (
        <>
          <p>내가 주문한 내역입니다</p>
          <nav>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <button
                    type="button"
                    onClick={() => handleProductClick(transaction.id)}
                  >
                    <p>{transaction.maker}</p>
                    <p>{transaction.name}</p>
                    <p>
                      To.
                      {' '}
                      {transaction.recipient}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <ul>
              {pagesCount ? renderPageButtons() : null}
            </ul>
          </nav>
        </>
      )}
    </article>
  );
}
