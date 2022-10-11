import numberFormat from '../utils/numberFormat';

export default function Product({
  product, selectedCount, totalCost, canBuy,
  onClickAdd, onClickReduce, onClickBuy,
}) {
  const handleClickAdd = () => {
    onClickAdd();
  };

  const handleClickReduce = () => {
    onClickReduce();
  };

  const handleClickBuy = () => {
    onClickBuy();
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
            onClick={handleClickReduce}
            disabled={selectedCount < 2}
          >
            -
          </button>
          {selectedCount}
          <button
            type="button"
            onClick={handleClickAdd}
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
        name="present-button"
        onClick={handleClickBuy}
      >
        선물하기
      </button>
      {!canBuy ? (
        <p>잔액이 부족하여 선물하기가 불가합니다.</p>
      ) : null}
    </article>
  );
}
