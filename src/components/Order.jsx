/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/numberFormat';

import OrderInputArea from './OrderInputArea';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
  padding: 2.5em 7.5vw;
  border: 1px solid #D9D9D9;
  margin: 3em 20vw;
  display: grid;
  grid-template-rows: 2fr 8fr;
  gap: 3em;

  img {
    height: 8em;
    width: 8em;
    border-radius: 1em;
    object-fit: cover;
  }

  p {
    margin-bottom: .5em;
  }

  p:last-child {
    margin-bottom: 0;
  }

  dt, dd {
    display: inline-block;
    margin-right: .5em;
  }
`;

const ProductOverviewSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 8fr;
  gap: 2em;
`;

const ProductOverview = styled.div`
  margin-block: .25em;
  display: grid;
  grid-template-rows: 4fr 6fr;
`;

const Maker = styled.p`
  color: #999999;
`;

const TotalCountAndPrice = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

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
    <Container>
      <ProductOverviewSection>
        <img
          src={product.imageUrl}
          alt="상품 이미지"
        />
        <ProductOverview>
          <div>
            <Maker>{product.maker}</Maker>
            <p>{product.name}</p>
          </div>
          <TotalCountAndPrice>
            <p>
              <dt>구매수량: </dt>
              <dd>{purchaseCount}</dd>
            </p>
            <p>
              <dt>총 상품금액: </dt>
              <dd>
                {numberFormat(purchaseCost)}
                원
              </dd>
            </p>
          </TotalCountAndPrice>
        </ProductOverview>
      </ProductOverviewSection>
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
        <PrimaryButton
          type="submit"
        >
          선물하기
        </PrimaryButton>
      </form>
    </Container>
  );
}
