import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';
import HeroSection from './HeroSection';
import DescriptionOutline from './ui/DescriptionOutline';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
`;

const ProductsSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3em 20vw;
`;

const Overview = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1.5em;
  text-align: ${({ hasProducts }) => (hasProducts ? 'left' : 'center')};
`;

const ProductsList = styled.ul`
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 1em;
  row-gap: 1.5em;
  
  li {
    height: 16em;
  }

  button {
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    border: 1px dotted #999999;
  }

  img {
    
  }
`;

const PageNumbers = styled.ul`
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

export default function Products({
  products, pagesCount, currentPage, onClickProduct, onClickPage,
}) {
  const handleProductClick = (productId) => {
    onClickProduct(productId);
  };

  const handlePageClick = (page) => {
    onClickPage(page);
  };

  const renderPageButtons = (currentPageNumber) => {
    const iterator = Array(pagesCount).fill(0).map((_, index) => index + 1);

    return iterator.map((page) => (
      <li key={page}>
        <PageNumber
          type="button"
          currentPageNumber={currentPageNumber}
          pageNumber={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageNumber>
      </li>
    ));
  };

  return (
    <Container>
      <HeroSection />
      <ProductsSection>
        {!products.length ? (
          <Overview
            hasProducts={products.length}
          >
            상품이 존재하지 않습니다.
          </Overview>
        ) : (
          <>
            <Overview
              hasProducts={products.length}
            >
              인기선물을 한 자리에 모았어요
            </Overview>
            <nav>
              <ProductsList>
                {products.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img
                        src=""
                        alt="사진"
                      />
                      <DescriptionOutline>
                        <p>{product.maker}</p>
                        <p>{product.name}</p>
                        <p>
                          <span>{numberFormat(product.price)}</span>
                          원
                        </p>
                      </DescriptionOutline>
                    </button>
                  </li>
                ))}
              </ProductsList>
            </nav>
            <nav>
              <PageNumbers>
                {pagesCount ? renderPageButtons(currentPage) : null}
              </PageNumbers>
            </nav>
          </>
        )}
      </ProductsSection>
    </Container>
  );
}
