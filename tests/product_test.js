Feature('상품 세부 정보 확인: 사용자가 상품의 세부 정보를 확인하는 시나리오');

Scenario('상품 상세 페이지 UI 확인 및 로그인', ({ I }) => {
  // Given
  I.setupProduct({
    id: 1,
    maker: '프렌들리숍',
    name: '마스터볼',
    price: 1000000,
    description: '포켓몬을 잡을 수 있는 최고의 볼이다.',
  });
  // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });

  // When 1
  I.amOnPage('/products/1');

  // Then 1
  I.see('회원가입');
  I.see('로그인');
  I.see('마스터볼');
  I.see('1,000,000원');
  I.see('제조사');
  I.see('프렌들리숍');
  I.see('구매수량');
  I.see('-');
  I.see('1');
  I.see('+');
  I.see('상품설명');
  I.see('포켓몬을 잡을 수 있는 최고의 볼이다');
  I.see('총 상품금액: 1,000,000원');
  I.see('선물하기');

  // // When 2
  // I.click('선물하기');

  // // Then 2
  // I.seeLoginPage();

  // // When 3
  // I.login({ id: 'hsjkdss228', password: 'Megaptera!1' });
  // I.amOnPage('/products/1');

  // // Then 3
  // I.see('내 잔액: 50,000원');
  // I.see('로그아웃');
  // I.see('포켓몬을 잡을 수 있는 최고의 볼이다');
});

Scenario('구매수량 조정', ({ I }) => {
  // Given
  I.setupProduct({
    id: 1,
    maker: '프렌들리숍',
    name: '동굴탈출 로프',
    price: 200,
    description: '동굴에서 빠져나올 수 있다.',
  });

  // When 1
  I.amOnPage('/products/1');

  // Then 1
  I.seeElement('button[disabled]');

  // When 2
  I.clickNTimes({ target: '+', times: 1 });

  // Then 2
  I.dontSeeElement('button[disabled]');
  I.see('2');
  I.see('총 상품금액: 400원');

  // When 3
  I.clickNTimes({ target: '+', times: 3 });
  I.clickNTimes({ target: '-', times: 4 });

  // Then 3
  I.seeElement('button[disabled]');
  I.see('2');
  I.see('총 상품금액: 200원');
});

Scenario('잔액이 총 상품금액보다 적은 상태에서 선물하기를 진행하는 경우', ({ I }) => {
  // Given
  I.setupProduct({
    id: 1,
    maker: '로켓단',
    name: '야돈의 꼬리',
    price: 1000000,
    description: '못된 로켓단이 야돈의 꼬리를 잘라 만들었다.',
  });
  // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });

  // When
  // I.login({ id: 'hsjkdss228', password: 'Megaptera!1' });
  I.amOnPage('/products/1');
  I.click('button[name="present-button"]');

  // Then
  I.see('잔액이 부족하여 선물하기가 불가합니다.');
});

Scenario('잔액이 총 상품금액보다 많은 상태에서 선물하기를 진행하는 경우', ({ I }) => {
  // Given
  I.setupProduct({
    id: 1,
    maker: '낚시꾼',
    name: '대단한 낚싯대',
    price: 49900,
    description: '최고의 포켓몬을 낚아올릴 수 있는 지상 최강의 낚싯대.',
  });
  // I.setupAccount({ id: 'hsjkdss228', password: 'Megaptera!1', amount: 50000 });

  // When
  // I.login({ id: 'hsjkdss228', password: 'Megaptera!1' });
  I.amOnPage('/products/1');
  I.click('button[name="present-button"]');

  // Then
  I.see('받는 분 성함*');
  I.see('받는 분 주소*');
  I.see('받는 분께 보내는 메세지');
});
