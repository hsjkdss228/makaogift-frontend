import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';
import HeroSection from './HeroSection';
import DescriptionOutline from './ui/DescriptionOutline';
import ListSection from './ui/ListSection';
import ListTitle from './ui/ListTitle';
import Overviews from './ui/Overviews';
import PageNumbers from './PageNumbers';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
`;

export default function Products({
  products, pagesCount, currentPage,
  onClickProduct, onClickPage,
}) {
  const handleProductClick = (productId) => {
    onClickProduct(productId);
  };

  const handlePageClick = (page) => {
    onClickPage(page);
  };

  return (
    <Container>
      <HeroSection />
      <ListSection>
        {!products.length ? (
          <ListTitle
            hasContent={products.length}
          >
            상품이 존재하지 않습니다.
          </ListTitle>
        ) : (
          <>
            <ListTitle
              hasContent={products.length}
            >
              인기선물을 한 자리에 모았어요
            </ListTitle>
            <nav>
              <Overviews>
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
