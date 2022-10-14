Feature('홈 화면');

Scenario('홈 화면 UI 확인 (로그인 전)', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.seeHeaderWhenNotLoggedIn();
  I.seeHomePage();
});

Scenario('홈 화면 UI 확인 (로그인 후)', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });

  // Then
  I.seeHeaderWhenLoggedIn();
  I.seeHomePage();
});
