const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  // Seeing UI
  seeHomePage() {
    this.see('무얼 선물할 지 고민이라면');
    this.see('특별한');
    this.see('관상어들을 전하세요');
    this.see('마카오 선물하기에서만 볼 수 있는 특별한 관상어들');
  },
  seeHeader() {
    this.see('선물하기');
    this.see('홈');
    this.see('스토어');
    this.see('주문조회');
  },
  seeHeaderWhenNotLoggedIn() {
    this.seeHeader();
    this.see('로그인');
    this.see('회원가입');
  },
  seeHeaderWhenLoggedIn() {
    this.seeHeader();
    this.see('로그아웃');
    this.see('내 잔액:');
  },
  seeSignUpPage() {
    this.see('SIGN UP');
    this.see('이름 :');
    this.see('3-7자까지 한글만 사용 가능');
    this.see('아이디 :');
    this.see('영문소문자/숫자, 4~16자만 사용 가능');
    this.see('비밀번호 :');
    this.see('8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함');
    this.see('비밀번호 확인 :');
    this.see('회원가입');
  },
  seeWelcomePage() {
    this.see('회원가입 완료');
    this.see('마카오 선물하기 회원가입이 완료되었습니다.');
    this.see('정상적인 서비스 이용을 위해 로그인을 진행해주세요.');
    this.see('로그인하기');
  },
  seeLoginPage() {
    this.see('USER LOGIN');
    this.see('아이디');
    this.see('비밀번호');
    this.see('로그인하기');
    this.see('회원가입');
  },
  seeHeroSection() {
    this.see('평범한 선물은 주기도 민망하다구요?');
    this.see('작정하고 준비한');
    this.see('마카오톡 선물하기 아이템');
    this.see('마카오톡 선물하기에서만 볼 수 있는 특별템 기획전');
  },
  seeOrderFields() {
    this.see('받는 분 성함*');
    this.see('받는 분 주소*');
    this.see('받는 분께 보내는 메세지');
    this.seeElement('button[type="submit"]');
  },

  // Setups
  deleteAccountForTest() {
    this.amOnPage(`${backdoorBaseUrl}/delete-account-for-test?identification=raboot3368`);
  },
  // deleteTransactionForTest() {
  //   this.amOnPage(`${backdoorBaseUrl}/delete-transaction-for-test?messageToSend=halo`);
  // },
  // setupAccount({ }) {

  // },
  // resetProducts() {
  //   this.amOnPage(`${backdoorBaseUrl}/reset-products`);
  // },
  // setupProduct({
  //   id, maker, name, price, description,
  // }) {
  //   this.amOnPage([
  //     backdoorBaseUrl,
  //     '/setup-product',
  //     `?id=${id}`,
  //     `&maker=${maker}`,
  //     `&name=${name}`,
  //     `&price=${price}`,
  //     `&description=${description}`,
  //   ].join(''));
  // },
  // setupProducts({ count }) {
  //   this.amOnPage([
  //     backdoorBaseUrl,
  //     '/setup-products',
  //     `?count=${count}`,
  //   ].join(''));
  // },

  // Operations
  login({ identification, password }) {
    this.amOnPage('/login');
    this.fillField('아이디', identification);
    this.fillField('비밀번호', password);
    this.click('button[type="submit"]');
  },
  logout() {
    this.click('로그아웃');
  },
  fillSignUpFieldsAndSubmit({
    name, identification, password, confirmPassword,
  }) {
    this.fillField('이름 :', name);
    this.fillField('아이디 :', identification);
    this.fillField('비밀번호 :', password);
    this.fillField('비밀번호 확인 :', confirmPassword);
    this.click('button[type="submit"]');
  },
  clickNTimes({ target, times }) {
    const iteration = Array(times).fill(0);

    iteration.forEach(() => {
      this.click(target);
    });
  },
  setProductCountAndOrder({ productId, times }) {
    this.login({ identification: 'hsjkdss228', password: 'Megaptera!1' });
    this.amOnPage(`/products/${productId}`);
    this.clickNTimes({ target: '+', times });
    this.click('button[name="present-button"]');
  },
  fillOrderFieldsAndSubmit({
    receiver, address, messageToSend,
  }) {
    this.fillField('받는 분 성함*', receiver);
    this.fillField('받는 분 주소*', address);
    this.fillField('받는 분께 보내는 메세지', messageToSend);
    this.click('button[type="submit"]');
  },
});
