Feature('상품 주문: 사용자가 상품 주문을 위해 선물하기 페이지를 이용하는 시나리오');

Scenario('주문 페이지 UI 확인', ({ I }) => {
  // Given
  I.setupProduct({
    id: 1,
    maker: '60계치킨',
    name: '호랑이치킨',
    price: 18000,
    description: '호랑이 기운이 쑥쑥!!',
  });
  // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });

  // When
  I.amOnPage('/products/1');
  I.clickNTimes({ target: '+', times: 1 });
  I.click('button[name="present-button"]');

  // Then
  I.see('60계치킨');
  I.see('호랑이치킨');
  I.see('구매수량: 2');
  I.see('총 상품금액: 36,000원');
  I.see('받는 분 성함*');
  I.see('3~7자까지 한글만 사용 가능');
  I.see('받는 분 주소*');
  I.see('주소지를 입력해주세요');
  I.see('받는 분께 보내는 메세지');
  I.see('100글자 이내로 입력해주세요');
  I.seeElement('button[type="submit"]');
});

// Scenario('입력 필드에 모든 내용을 정상 입력 후 선물하기 버튼 클릭 시 주문 조회 페이지로 이동', ({ I }) => {
//   // Given
//   I.setupProduct({
//     id: 1,
//     maker: '60계치킨',
//     name: '호랑이치킨',
//     price: 18000,
//     description: '호랑이 기운이 쑥쑥!!',
//   });
//   // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });
//   I.amOnPage('/products/1');
//   I.clickNTimes({ target: '+', times: 1 });
//   I.click('button[name="present-button"]');

//   // When
//   I.fillField('받는 분 성함*', '황인우');
//   I.fillField('받는 분 주소*', '서울 광진구 아차산로40길 39-16');
//   I.fillField('받는 분께 보내는 메세지', '잘 먹으라고~~~');
//   I.seeElement('button[type="submit"]');

//   // Then
//   I.see('내가 주문한 내역입니다.');
//   I.see('60계치킨');
//   I.see('호랑이치킨');
//   I.see('To. 황인우');
// });

// Scenario('입력 필드에 받는 분께 보내는 메세지만 입력하지 않고 선물하기 버튼 클릭 시 주문 조회 페이지로 이동', ({ I }) => {
//   // Given
//   I.setupProduct({
//     id: 1,
//     maker: '60계치킨',
//     name: '호랑이치킨',
//     price: 18000,
//     description: '호랑이 기운이 쑥쑥!!',
//   });
//   // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });
//   I.amOnPage('/products/1');
//   I.clickNTimes({ target: '+', times: 1 });
//   I.click('button[name="present-button"]');

//   // When
//   I.fillField('받는 분 성함*', '김인우');
//   I.fillField('받는 분 주소*', '충남 금산군 금산읍 상옥1길 9');
//   I.seeElement('button[type="submit"]');

//   // Then
//   I.see('To. 김인우');
// });
