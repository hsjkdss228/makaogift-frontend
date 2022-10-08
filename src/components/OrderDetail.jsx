export default function OrderDetail({ transaction }) {
  console.log(transaction);

  // TODO: table 구조가 나을지 ul과 dl을 조합하는 구조가 나을지
  //  고민해볼 필요가 있겠다.

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
            <dd>{transaction.purchaseCost}</dd>
          </li>
          <li>
            <dt>구매일</dt>
            <dd>{transaction.createdAt}</dd>
          </li>
          <li>
            <dt>받는 분</dt>
            <dd>{transaction.recipient}</dd>
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
