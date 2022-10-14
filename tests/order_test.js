Feature('상품 주문: 사용자가 상품 주문을 위해 선물하기 페이지를 이용하는 시나리오');

Scenario('주문 페이지 UI 확인', ({ I }) => {
  // When
  // 1번 id 상품 가격: 10,000원
  I.setProductCountAndOrder({ productId: 1, times: 2 });

  // Then
  I.see('한강수족관');
  I.see('구매수량');
  I.see('3');
  I.see('총 상품금액');
  I.see('30,000원');
  I.seeOrderFields();
});

Scenario('입력 필드에 모든 내용을 정상 입력 후 선물하기 버튼 클릭 시 주문 조회 페이지로 이동', ({ I }) => {
  // Given
  // 1번 id 상품 가격: 10,000원
  I.setProductCountAndOrder({ productId: 1, times: 5 });

  // When
  I.fillOrderFieldsAndSubmit({
    receiver: '신범식', address: '서울 성북구', messageToSend: 'halo',
  });

  // Then
  I.see('내가 주문한 내역입니다');
  // I.see('To.');
  // I.see('신범식');
});

Scenario('입력 필드에 받는 분께 보내는 메세지만 입력하지 않고 선물하기 버튼 클릭 시 주문 조회 페이지로 이동', ({ I }) => {
  // Given
  // 4번 id 상품 가격: 3,000원
  I.setProductCountAndOrder({ productId: 4, times: 3 });

  // When
  I.fillOrderFieldsAndSubmit({
    receiver: '신범식', address: '서울 성북구', messageToSend: '',
  });

  // Then
  I.see('내가 주문한 내역입니다');
});

Scenario('잘못된 입력 예외처리', ({ I }) => {
  // Given
  // 5번 id 상품 가격: 1,000원
  I.setProductCountAndOrder({ productId: 5, times: 19 });

  // When 1
  I.fillOrderFieldsAndSubmit({
    receiver: '신범', address: '서울 성북구', messageToSend: '',
  });

  // Then 1
  I.see('3-7자까지 한글만 사용 가능합니다');

  // When 2
  I.fillOrderFieldsAndSubmit({
    receiver: '신범식신범식신범식', address: '서울 성북구', messageToSend: '',
  });

  // Then 2
  I.see('3-7자까지 한글만 사용 가능합니다');

  // When 3
  I.fillOrderFieldsAndSubmit({
    receiver: '신123식신범', address: '서울 성북구', messageToSend: '',
  });

  // Then 3
  I.see('3-7자까지 한글만 사용 가능합니다');

  // When 4
  I.fillField('받는 분께 보내는 메세지', '생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해'
   + '생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해'
   + '생일축하해생일축하해생일축하해생일축하해국방의의무축하해');

  // Then 4
  I.seeElement('input[value="생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해'
  + '생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해생일축하해'
  + '생일축하해생일축하해생일축하해생일축하해"]');
});

Scenario('입력 필드 내 모든 필수 입력란 내용을 입력하지 않고 선물하기 버튼 클릭 시 예외처리', ({ I }) => {
  // Given
  // 6번 id 상품 가격: 3,000원
  I.setProductCountAndOrder({ productId: 6, times: 1 });

  // When 1
  I.fillOrderFieldsAndSubmit({
    receiver: '', address: '', messageToSend: '',
  });

  // Then 1
  I.see('성함을 입력해주세요');
  I.see('주소를 입력해주세요');
});

Scenario('받는 사람 이름을 입력하지 않고 선물하기 버튼 클릭 시 예외처리', ({ I }) => {
  // Given
  // 6번 id 상품 가격: 3,000원
  I.setProductCountAndOrder({ productId: 6, times: 1 });

  // When 1
  I.fillOrderFieldsAndSubmit({
    receiver: '', address: '경남 진주시', messageToSend: '',
  });

  // Then 2
  I.see('성함을 입력해주세요');
});

Scenario('받는 분 주소를 입력하지 않고 선물하기 버튼 클릭 시 예외처리', ({ I }) => {
  // Given
  // 6번 id 상품 가격: 3,000원
  I.setProductCountAndOrder({ productId: 6, times: 1 });

  // When 1
  I.fillOrderFieldsAndSubmit({
    receiver: '한지성', address: '', messageToSend: '',
  });

  // Then 2
  I.see('주소를 입력해주세요');
});
