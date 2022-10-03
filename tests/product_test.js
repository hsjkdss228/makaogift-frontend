Feature('상품 세부 정보 확인: 사용자가 스토어에서 상품 목록을 확인하는 경우');

Scenario('상품 상세 페이지 UI 확인 및 로그인', ({ I }) => {
  // Given
  // I.setupProduct({
  //   id: 1,
  //   maker: '제조사명',
  //   name: '여기에는 상품/옵션명이 들어가고 최대 줄은 두 줄임 이렇게 보이겠지요 아마도',
  //   price: 10000,
  //   description: '이 상품은 이러이러합니다',
  // });
  // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });

  // When 1
  I.amOnPage('/products/1');

  // Then 1
  I.see('회원가입');
  I.see('로그인');
  I.see('여기에는 상품/옵션명이 들어가고 최대 줄은 두 줄임 이렇게 보이겠지요 아마도');
  I.see('10,000원');
  I.see('제조사');
  I.see('제조사명');
  I.see('구매수량');
  I.see('-');
  I.see('1');
  I.see('+');
  I.see('상품설명');
  I.see('이 상품은 이러이러합니다');
  I.see('총 상품금액: 10,000원');
  I.see('선물하기');

  // When 2
  I.click('선물하기');

  // Then 2
  I.seeLoginPage();

  // When 3
  I.login({ id: 'hsjkdss228', password: 'Megaptera!1' });
  I.amOnPage('/products/1');

  // Then 3
  I.see('내 잔액: 50,000원');
  I.see('로그아웃');
  I.see('여기에는 상품/옵션명이 들어가고 최대 줄은 두 줄임 이렇게 보이겠지요 아마도');
});
