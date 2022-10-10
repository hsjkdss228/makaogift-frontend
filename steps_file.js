const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  // Seeing UI
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

  // Setups
  // setupAccount({ }) {

  // },
  resetProducts() {
    this.amOnPage(`${backdoorBaseUrl}/reset-products`);
  },
  setupProduct({
    id, maker, name, price, description,
  }) {
    this.amOnPage([
      backdoorBaseUrl,
      '/setup-product',
      `?id=${id}`,
      `&maker=${maker}`,
      `&name=${name}`,
      `&price=${price}`,
      `&description=${description}`,
    ].join(''));
  },
  setupProducts({ count }) {
    this.amOnPage([
      backdoorBaseUrl,
      '/setup-products',
      `?count=${count}`,
    ].join(''));
  },

  // Operations
  clickNTimes({ target, times }) {
    const iteration = Array(times).fill(0);

    iteration.forEach(() => {
      this.click(target);
    });
  },
});
