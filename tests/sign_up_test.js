/* eslint-disable object-property-newline */
Feature('회원가입 화면');

Scenario('회원가입 화면 UI', ({ I }) => {
  // When
  I.amOnPage('/signup');

  // Then
  I.seeSignUpPage();
});

Scenario('회원가입 성공 및 성공 후 로그인하기 버튼 클릭', ({ I }) => {
  // Given
  I.deleteAccountForTest();
  I.amOnPage('/signup');

  // When 1
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then 1
  I.seeWelcomePage();

  // When 2
  I.click('로그인하기');

  // Then 2
  I.seeLoginPage();
});

Scenario('이미 존재하는 아이디를 입력한 뒤 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then
  I.see('해당 아이디는 사용할 수 없습니다');
});

Scenario('이름 입력 필드를 입력하지 않고 회원가입 시도', ({ I }) => {
  // Given
  I.deleteAccountForTest();
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then
  I.see('이름을 입력해주세요');
});

Scenario('아이디 입력 필드를 입력하지 않고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: '',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호 입력 필드를 입력하지 않고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: '', confirmPassword: 'Megaptera!1',
  });

  // Then
  I.see('비밀번호를 입력해주세요');
});

Scenario('비밀번호 확인 입력 필드를 입력하지 않고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: '',
  });

  // Then
  I.see('비밀번호 확인을 입력해주세요');
});

Scenario('모든 입력 필드를 입력하지 않고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '', identification: '', password: '', confirmPassword: '',
  });

  // Then
  I.see('이름을 입력해주세요');
  I.see('아이디를 입력해주세요');
  I.see('비밀번호를 입력해주세요');
  I.see('비밀번호 확인을 입력해주세요');
});

Scenario('잘못된 이름을 입력하고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When 1
  I.fillSignUpFieldsAndSubmit({
    name: '인우', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then 1
  I.see('이름을 다시 확인해주세요');

  // When 2
  I.amOnPage('/signup');
  I.fillSignUpFieldsAndSubmit({
    name: '정신차려이각박한세상속에서', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then 2
  I.see('이름을 다시 확인해주세요');
});

Scenario('잘못된 아이디를 입력하고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When 1
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: '7777-7777-7777',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then 1
  I.see('아이디를 다시 확인해주세요');

  // When 2
  I.amOnPage('/signup');
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'in1',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then 2
  I.see('아이디를 다시 확인해주세요');

  // When 3
  I.amOnPage('/signup');
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'justicerainsfromabove1234',
    password: 'Megaptera!1', confirmPassword: 'Megaptera!1',
  });

  // Then 3
  I.see('아이디를 다시 확인해주세요');
});

Scenario('잘못된 비밀번호를 입력하고 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When 1
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: 'megaptera!1', confirmPassword: 'megaptera!1',
  });

  // Then 1
  I.see('비밀번호를 다시 확인해주세요');

  // When 2
  I.amOnPage('/signup');
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: 'Megaptera!', confirmPassword: 'Megaptera!',
  });

  // Then 2
  I.see('비밀번호를 다시 확인해주세요');

  // When 3
  I.amOnPage('/signup');
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'hsjkdss228',
    password: 'Megaptera1', confirmPassword: 'Megaptera1',
  });

  // Then 3
  I.see('비밀번호를 다시 확인해주세요');

  // When 4
  I.amOnPage('/signup');
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'hsjkdss228',
    password: 'Megap!1', confirmPassword: 'Megap!1',
  });

  // Then 4
  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호, 비밀번호 확인이 일치하지 않는 상태에서 회원가입 시도', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillSignUpFieldsAndSubmit({
    name: '황인우', identification: 'raboot3368',
    password: 'Megaptera!1', confirmPassword: 'Megaptera@2',
  });

  // Then
  I.see('비밀번호가 일치하지 않습니다');
});
