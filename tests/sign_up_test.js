Feature('회원가입 화면');

Scenario('회원가입 화면 UI', ({ I }) => {
  // When
  I.amOnPage('/signup');

  // Then
  I.seeSignUpPage();
});

Scenario('회원가입 성공 및 성공 후 로그인하기 버튼 클릭', ({ I }) => {
  // TODO: 일단은 테스트를 수행하기 전 데이터베이스의 내용을 직접 삭제하는 식으로 진행하다가
  //  추후 backdoor에 지금 입력한 양식의 데이터를 삭제한 뒤 테스트를 진행하는 방식으로 수정

  // Given
  I.amOnPage('/signup');

  // When 1
  I.fillField('이름 :', '황인우');
  I.fillField('아이디 :', 'raboot3368');
  I.fillField('비밀번호 :', 'Megaptera12#$');
  I.fillField('비밀번호 확인 :', 'Megaptera12#$');
  I.click('button[type="submit"]');

  // Then 1
  I.seeWelcomePage();

  // When 2
  I.click('로그인하기');

  // Then 2
  I.seeLoginPage();
});
