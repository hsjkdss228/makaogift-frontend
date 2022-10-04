import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

export default function Product() {
  const productStore = useProductStore();

  const { product, selectedCount, totalCost } = productStore;

  const handleAddClick = () => {
    productStore.addCountAndTotalCost();
  };

  const handleReduceClick = () => {
    productStore.reduceCountAndTotalCost();
  };

  const handleBuyClick = () => {

  };

  return (
    <article>
      <p>{product.name}</p>
      <p>
        {numberFormat(product.price)}
        원
      </p>
      <dl>
        <dt>제조사</dt>
        <dd>{product.maker}</dd>
        <dt>구매수량</dt>
        <dd>
          <button
            type="button"
            onClick={handleReduceClick}
            disabled={selectedCount < 2}
          >
            -
          </button>
          {selectedCount}
          <button
            type="button"
            onClick={handleAddClick}
          >
            +
          </button>
        </dd>
        <dt>상품설명</dt>
        <dd>{product.description}</dd>
      </dl>
      <p>
        총 상품금액:
        {' '}
        <span>
          {numberFormat(totalCost)}
          원
        </span>
      </p>
      <button
        type="button"
        onClick={handleBuyClick}
      >
        선물하기
      </button>
    </article>
  );
}
