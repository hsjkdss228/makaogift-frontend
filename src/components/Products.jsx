import { useNavigate } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

export default function Products() {
  const navigate = useNavigate();

  const productStore = useProductStore();

  const { products, pagesCount } = productStore;

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`, {
      state: {
        productId,
      },
    });
  };

  const handlePageClick = (page) => {
    productStore.fetchProducts(page);
    productStore.resetCountAndCost();
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
      <section>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <p>작정하고 준비한</p>
        <p>마카오톡 선물하기 아이템</p>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </section>
      <p>인기선물을 한 자리에 모았어요</p>
      {!products.length ? (
        <p>상품이 존재하지 않습니다.</p>
      ) : (
        <>
          <nav>
            <ul>
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
