Feature('상품 세부 정보 확인: 사용자가 상품의 세부 정보를 확인하는 시나리오');

Scenario('미로그인 상태에서 상품 상세 페이지 UI 확인 및 선물하기 버튼 클릭 시 로그인 UI 확인', ({ I }) => {
  // When 1
  I.amOnPage('/products/1');

  // Then 1
  I.see('오픈기념할인 무제한97%할인 획득찬스');
  I.see('-');
  I.see('1');
  I.see('+');
  I.see('선물하기');

  // When 2
  I.click('선물하기');

  // Then 2
  I.seeLoginPage();
});

Scenario('구매수량 조정', ({ I }) => {
  // When 1
  I.amOnPage('/products/1');

  // Then 1
  I.seeElement('button[disabled]');

  // When 2
  I.clickNTimes({ target: '+', times: 1 });

  // Then 2
  I.dontSeeElement('button[disabled]');
  I.see('2');
  I.see('20,000원');

  // When 3
  I.clickNTimes({ target: '+', times: 3 });
  I.clickNTimes({ target: '-', times: 4 });

  // Then 3
  I.seeElement('button[disabled]');
});

Scenario('잔액이 총 상품금액보다 적은 상태에서 선물하기를 진행하는 경우', ({ I }) => {
  // When
  I.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });
  I.amOnPage('/products/12');
  I.click('button[name="present-button"]');

  // Then
  I.see('잔액이 부족하여 선물하기가 불가합니다.');
});

Scenario('잔액이 총 상품금액보다 많은 상태에서 선물하기를 진행하는 경우', ({ I }) => {
  // When
  I.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });
  I.amOnPage('/products/1');
  I.click('button[name="present-button"]');

  // Then
  I.seeOrderFields();
});
