import styled from 'styled-components';
import HeroSection from './HeroSection';

const List = styled.ul`
  // TODO: list-style은 글로벌 속성으로 옮겨야 함
  // 나중에 CSS 강의 다시 보면서 테마, 글로벌 속성 등 적용시킬 것
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export default function Products({
  products, pagesCount, onClickProduct, onClickPage,
}) {
  const handleProductClick = (productId) => {
    onClickProduct(productId);
  };

  const handlePageClick = (page) => {
    onClickPage(page);
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
      <HeroSection />
      <p>인기선물을 한 자리에 모았어요</p>
      {!products.length ? (
        <p>상품이 존재하지 않습니다.</p>
      ) : (
        <>
          <nav>
            <List>
              {products.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <p>{product.maker}</p>
                    <p>{product.name}</p>
                    <p>
                      {product.price}
                      원
                    </p>
                  </button>
                </li>
              ))}
            </List>
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
