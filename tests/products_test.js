Feature('상품 목록 확인: 사용자가 스토어에서 상품 목록을 확인하는 경우');

// TODO: 서버에서 불러오도록 해야 함!!
// 구현 순서: 우선 프론트엔드에서 모킹을 통해 구조를 짠 뒤
// 백엔드에서 진짜로 가져오도록 구현

Scenario('상품이 존재하지 않는 경우', ({ I }) => {
  // // Given
  // I.setupProducts({ count: 3 });

  // I.amOnPage('/');

  // When
  I.amOnPage('/products');

  // Then
  I.see('회원가입');
  I.see('로그인');
  I.see('평범한 선물은 주기도 민망하다구요?');
  I.see('작정하고 준비한');
  I.see('마카오톡 선물하기 아이템');
  I.see('마카오톡 선물하기에서만 볼 수 있는 특별템 기획전');
  I.see('인기선물을 한 자리에 모았어요');
  I.see('상품이 존재하지 않습니다.');
});

Scenario('상품이 8개 이하 존재하는 경우', ({ I }) => {
  // // Given
  // I.setupProducts({ count: 3 });

  // I.amOnPage('/');

  // When
  I.amOnPage('/products');

  // Then
  I.see('회원가입');
  I.see('로그인');
  I.see('평범한 선물은 주기도 민망하다구요?');
  I.see('작정하고 준비한');
  I.see('마카오톡 선물하기 아이템');
  I.see('마카오톡 선물하기에서만 볼 수 있는 특별템 기획전');
  I.see('인기선물을 한 자리에 모았어요');
  I.see('제조사 1');
  I.see('제조사 3');
  I.see('상품 옵션명 1');
  I.see('상품 옵션명 3');
  I.see('100원');
  I.see('300원');
});
