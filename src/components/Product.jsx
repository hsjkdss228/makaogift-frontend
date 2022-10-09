import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

import numberFormat from '../utils/numberFormat';

export default function Product() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const productStore = useProductStore();
  const {
    product, selectedCount, totalCost, canBuy,
  } = productStore;

  const userStore = useUserStore();
  const { amount } = userStore;

  const handleAddClick = () => {
    productStore.addCountAndTotalCost();
  };

  const handleReduceClick = () => {
    productStore.reduceCountAndTotalCost();
  };

  const handleBuyClick = () => {
    if (!accessToken) {
      navigate('/login');
    }

    if (amount < totalCost) {
      productStore.discontinuePurchase();
      return;
    }

    // TODO: 보내는 사람 정보를 같이 보내서
    //  Transaction을 생성할 때 같이 전달되도록 해야 함!
    if (accessToken) {
      navigate('/order', {
        state: {
          product,
          selectedCount,
          totalCost,
        },
      });
    }
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
        name="present-button"
        onClick={handleBuyClick}
      >
        선물하기
      </button>
      {!canBuy ? (
        <p>잔액이 부족하여 선물하기가 불가합니다.</p>
      ) : null}
    </article>
  );
}
