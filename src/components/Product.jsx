import { useState } from 'react';

import useShopStore from '../hooks/useShopStore';

export default function Product() {
  const shopStore = useShopStore();

  const { product } = shopStore;

  // TODO: 지금은 임시로 useState를 쓰고 있지만,
  //  어떤 별도의 Store에서 상태를 관리하도록 해야 할 것임
  const [purchaseCount, setPurchaseCount] = useState(1);
  const [totalCost, setTotalCost] = useState(product.price);

  const handleAddClick = () => {
    setPurchaseCount(purchaseCount + 1);
    setTotalCost(totalCost + product.price);
  };

  const handleReduceClick = () => {
    if (purchaseCount === 1) {
      return;
    }
    setPurchaseCount(purchaseCount - 1);
    setTotalCost(totalCost - product.price);
  };

  const handleBuyClick = () => {

  };

  return (
    <article>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <dl>
        <dt>제조사</dt>
        <dd>{product.maker}</dd>
        <dt>구매수량</dt>
        <dd>
          <button
            type="button"
            onClick={handleAddClick}
          >
            +
          </button>
          {purchaseCount}
          <button
            type="button"
            onClick={handleReduceClick}
          >
            -
          </button>
        </dd>
        <dt>상품설명</dt>
        <dd>{product.description}</dd>
      </dl>
      <p>
        총 상품금액:
        {' '}
        <span>{totalCost}</span>
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
