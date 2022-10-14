Feature('주문 목록 확인: 사용자가 자신이 선물한 이력을 확인하기 위해 주문 목록을 확인하는 경우의 시나리오');

Scenario('미로그인 상태에서 주문 목록 페이지 접속 시 로그인 화면으로 이동', ({ I }) => {
  // When
  I.amOnPage('/orders');

  // Then
  I.seeLoginPage();
});

Scenario('주문 내역 페이지 UI 확인', ({ I }) => {
  // Given
  I.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });

  // When
  I.amOnPage('/orders');

  // Then
  I.see('내가 주문한 내역입니다');
  I.see('1');
  I.see('2');
  I.see('3');
});

Scenario('주문 내역이 없는 경우 안내 메세지 확인', ({ I }) => {
  // Given
  I.login({ identification: 'test1234', password: 'Seedwhale!1' });

  // When
  I.amOnPage('/orders');

  // Then
  I.see('내가 주문한 내역이 없습니다');
});
