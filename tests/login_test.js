Feature('로그인 화면');

Scenario('로그인 UI 확인', ({ I }) => {
  // When
  I.amOnPage('/login');

  // Then
  I.seeLoginPage();
});

Scenario('정상적으로 로그인 후 홈 화면 확인', ({ I }) => {
  // When
  I.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });

  // Then
  I.seeHeaderWhenLoggedIn();
  I.seeHomePage();
});

Scenario('정보를 입력하지 않고 로그인 시도', ({ I }) => {
  // When 1
  I.login({ identification: '', password: '' });

  // Then 1
  I.see('아이디를 입력해주세요');

  // When 2
  I.login({ identification: '', password: 'Megaptera!1' });

  // Then 2
  I.see('아이디를 입력해주세요');

  // When 3
  I.login({ identification: 'hsjkdss228', password: '' });

  // Then 3
  I.see('비밀번호를 입력해주세요');
});

Scenario('등록되지 않은 아이디 혹은 일치하지 않는 비밀번호를 입력해 로그인 시도', ({ I }) => {
  // When 1
  I.login({ identification: 'abcdefghijk1234', password: 'Megaptera!1' });

  // Then 1
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');

  // When 2
  I.login({ identification: 'hsjkdss228', password: 'Megaptera' });

  // Then 2
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});
