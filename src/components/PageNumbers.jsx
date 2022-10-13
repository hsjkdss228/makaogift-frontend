import styled from 'styled-components';

const Container = styled.ul`
  margin-bottom: 5em;
  display: flex;
  justify-content: center;
  gap: .5em;
`;

const PageNumber = styled.button`
  font-size: 1em;
  color: ${({ currentPageNumber, pageNumber }) => (
    currentPageNumber === pageNumber
      ? '#000'
      : '#9A9A9A'
  )};
    background: none;
    border: none;
`;

// TODO: 페이지 넘버링 컴포넌트 나뉜 것에 대해 테스트 코드 작성 필요!!

export default function PageNumbers({ pagesCount, currentPage, onClick }) {
  const iterator = pagesCount
    ? Array(pagesCount).fill(0).map((_, index) => index + 1)
    : null;

  return (
    iterator ? (
      <Container>
        {iterator.map((page) => (
          <li key={page}>
            <PageNumber
              type="button"
              currentPageNumber={currentPage}
              pageNumber={page}
              onClick={() => onClick(page)}
            >
              {page}
            </PageNumber>
          </li>
        ))}
      </Container>
    ) : null
  );
}
