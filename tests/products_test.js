Feature('상품 목록 확인: 사용자가 스토어에서 상품 목록을 확인하는 시나리오');

// Scenario('상품이 존재하지 않는 경우', ({ I }) => {
//   // When
//   I.amOnPage('/products');

//   // Then
//   I.seeHeroSection();
//   I.see('상품이 존재하지 않습니다.');
// });

// Scenario('상품이 8개 이하로 존재하는 경우', ({ I }) => {
//   // // Given
//   // I.setupProducts({ count: 3 });

//   // I.amOnPage('/');

//   // // When
//   I.amOnPage('/products');

//   // Then
//   I.seeHeroSection();
//   this.see('인기선물을 한 자리에 모았어요');
//   I.see('1');
//   I.dontSee('2');
// });

Scenario('상품이 8개 이상으로 존재하는 경우', ({ I }) => {
  // // Given
  // I.setupProducts({ count: 70 });

  // I.amOnPage('/');

  // When 1
  I.amOnPage('/products');

  // Then 1
  I.see('네온테트라');
  I.dontSee('피라루쿠');
  I.see('1');
  I.see('2');

  // When 2
  I.click('2');

  // Then 2
  I.dontSee('네온테트라');
  I.see('피라루쿠');
});
