import numberFormat from '../utils/numberFormat';

export default function OrderDetail({ transaction }) {
  return (
    <article>
      <p>{transaction.maker}</p>
      <p>{transaction.name}</p>
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
    </article>
  );
}
