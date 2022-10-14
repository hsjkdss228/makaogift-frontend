import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
  margin: 5em 30em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 20em;
`;

const Maker = styled.p`
  margin-block: 1.5em 1em;
  color: #999999;
`;

const Name = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 2em;
`;

export default function OrderDetail({ transaction }) {
  return (
    <Container>
      <Image
        src={transaction.imageUrl}
        alt="사진"
      />
      <Maker>{transaction.maker}</Maker>
      <Name>{transaction.name}</Name>
      <dl>
        <ul>
          <li>
            <dt>구매수량</dt>
            <dd>{transaction.purchaseCount}</dd>
          </li>
          <li>
            <dt>총 상품금액</dt>
            <dd>
              {numberFormat(transaction.purchaseCost)}
              원
            </dd>
          </li>
          <li>
            <dt>구매일</dt>
            <dd>{transaction.createdAt}</dd>
          </li>
          <li>
            <dt>받는 분</dt>
            <dd>{transaction.receiver}</dd>
          </li>
          <li>
            <dt>받는 분 주소</dt>
            <dd>{transaction.address}</dd>
          </li>
          <li>
            <dt>받는 분께 보내는 메세지</dt>
            <dd>{transaction.messageToSend}</dd>
          </li>
        </ul>
      </dl>
    </Container>
  );
}
