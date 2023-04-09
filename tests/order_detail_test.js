Feature('주문 세부 정보 확인: 사용자가 자신이 선물한 상품과 메시지를 자세히 알기 위해'
  + '주문 세부 정보를 확인하는 경우의 시나리오');

Scenario('주문 상세 내역 페이지 UI 확인', ({ I }) => {
  // When
  I.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });
  I.amOnPage('/orders/70');

  // Then
  I.see('구매수량');
  I.see('1');
  I.see('총 상품금액');
  I.see('3,000');
  I.see('원');
  I.see('구매일');
  I.see('2022-10-14');
  I.see('받는 분');
  I.see('김민수');
  I.see('받는 분 주소');
  I.see('대전 유성구');
  I.see('받는 분께 보내는 메세지');
  I.see('세상의 모든 사람이 물고기를 키우게 만들자!');
});
