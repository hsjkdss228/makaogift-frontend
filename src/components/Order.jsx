/* eslint-disable no-nested-ternary */

import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/numberFormat';

import OrderInputArea from './OrderInputArea';

export default function Order({
  product, purchaseCount, purchaseCost, receiver, address, messageToSend,
  errors, onSubmit,
}) {
  const orderStore = useOrderStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(event);
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
        <OrderInputArea
          id="input-receiver"
          label="받는 분 성함"
          inputRequired
          type="text"
          value={receiver}
          onChange={(event) => (
            orderStore.changeReceiverInput(event.target.value)
          )}
          informationMessage={
            Object.prototype.hasOwnProperty.call(errors, '3000')
              ? errors['3000']
              : Object.prototype.hasOwnProperty.call(errors, '3002')
                ? errors['3002']
                : '3-7자까지 한글만 사용 가능'
          }
        />
        <OrderInputArea
          id="input-address"
          label="받는 분 주소"
          inputRequired
          type="text"
          value={address}
          onChange={(event) => (
            orderStore.changeAddressInput(event.target.value)
          )}
          informationMessage={
            Object.prototype.hasOwnProperty.call(errors, '3001')
              ? errors['3001']
              : '주소지를 입력해주세요'
          }
        />
        <OrderInputArea
          id="input-message-to-send"
          label="받는 분께 보내는 메세지"
          inputRequired={false}
          type="text"
          value={messageToSend}
          onChange={(event) => (
            orderStore.changeMessageInput(event.target.value)
          )}
          informationMessage="100글자 이내로 입력해주세요"
        />
        <button
          type="submit"
        >
          선물하기
        </button>
      </form>
    </article>
  );
}
