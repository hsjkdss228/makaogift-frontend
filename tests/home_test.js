Feature('홈 화면: 사용자가 홈 화면에 접속하는 경우');

Scenario('홈 화면 UI 확인 (로그인 전)', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('선물하기');
  I.see('홈');
  I.see('스토어');
  I.see('주문조회');
  I.see('회원가입');
  I.see('로그인');
  I.see('무얼 선물할 지 고민이라면');
  I.see('특별한 아이템을 전하세요');
  I.see('마카오 선물하기에서만 볼 수 있는 특별한 아이템');
});

// Scenario('홈 화면 UI 확인 (로그인 후)', ({ I }) => {
//   // Given
//   I.setupDatabase({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });
//   I.amOnPage('/');

//   // When
//   I.login({ id: 'hsjkdss228', password: 'Megaptera!1' });
//   I.amOnPage('/');

//   // Then
//   I.see('선물하기');
//   I.see('홈');
//   I.see('스토어');
//   I.see('주문조회');
//   I.see('회원가입');
//   I.see('로그인');
//   I.see('무얼 선물할 지 고민이라면');
//   I.see('특별한 아이템을 전하세요');
//   I.see('마카오 선물하기에서만 볼 수 있는 특별한 아이템');
// });
