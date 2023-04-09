import styled from 'styled-components';

import Overviews from './ui/Overviews';
import PageNumbers from './PageNumbers';
import ListSection from './ui/ListSection';
import ListTitle from './ui/ListTitle';
import DescriptionOutline from './ui/DescriptionOutline';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
`;

export default function Orders({
  transactions, pagesCount, currentPage,
  onClickOrderDetail, onClickPage,
}) {
  const handleOrderDetailClick = (orderId) => {
    onClickOrderDetail(orderId);
  };

  const handlePageClick = (page) => {
    onClickPage(page);
  };

  return (
    <Container>
      <ListSection>
        {!transactions.length ? (
          <ListTitle
            hasContent={transactions.length}
          >
            내가 주문한 내역이 없습니다
          </ListTitle>
        ) : (
          <>
            <ListTitle
              hasContent={transactions.length}
            >
              내가 주문한 내역입니다
            </ListTitle>
            <nav>
              <Overviews>
                {transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <button
                      type="button"
                      onClick={() => handleOrderDetailClick(transaction.id)}
                    >
                      <img
                        src={transaction.imageUrl}
                        alt="사진"
                      />
                      <DescriptionOutline>
                        <p>{transaction.maker}</p>
                        <p>{transaction.name}</p>
                        <p>
                          To.
                          {' '}
                          {transaction.receiver}
                        </p>
                      </DescriptionOutline>
                    </button>
                  </li>
                ))}
              </Overviews>
            </nav>
            <nav>
              <PageNumbers
                pagesCount={pagesCount}
                currentPage={currentPage}
                onClick={handlePageClick}
              />
            </nav>
          </>
        )}
      </ListSection>
    </Container>
  );
}
