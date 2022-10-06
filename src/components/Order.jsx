import { useNavigate } from 'react-router-dom';
import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/numberFormat';

export default function Order() {
  const navigate = useNavigate();

  const orderStore = useOrderStore();

  const {
    product, purchaseCount, purchaseCost,
    recipient, address, messageToSend,
  } = orderStore;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderId = await orderStore.order();

    if (orderId) {
      navigate('/orders');
    }
  };

  return (
    <article>
      <section>
        <p>{product.maker}</p>
        <p>{product.name}</p>
        <p>
          구매수량:
          {' '}
          {purchaseCount}
        </p>
        <p>
          총 상품금액:
          {' '}
          {numberFormat(purchaseCost)}
          원
        </p>
      </section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-recipient">
          받는 분 성함
          {/* TODO: *표시는 CSS 속성을 수정해서 윗첨자 처리해야 함 */}
          <span>*</span>
        </label>
        <input
          id="input-recipient"
          name="recipient"
          type="text"
          value={recipient}
          onChange={(event) => (
            orderStore.changeRecipientInput(event.target.value)
          )}
        />
        <p>
          3~7자까지 한글만 사용 가능
        </p>
        <label htmlFor="input-address">
          받는 분 주소
          <span>*</span>
        </label>
        <input
          id="input-address"
          name="address"
          type="text"
          value={address}
          onChange={(event) => (
            orderStore.changeAddressInput(event.target.value)
          )}
        />
        <p>
          주소지를 입력해주세요
        </p>
        <label htmlFor="input-message-to-send">
          받는 분께 보내는 메세지
        </label>
        <input
          id="input-message-to-send"
          name="messageToSend"
          type="text"
          value={messageToSend}
          onChange={(event) => (
            orderStore.changeMessageInput(event.target.value)
          )}
        />
        <p>
          100글자 이내로 입력해주세요
        </p>
        <button
          type="submit"
        >
          선물하기
        </button>
      </form>
    </article>
  );
}
