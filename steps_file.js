const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
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

  clickNTimes({ target, times }) {
    const iteration = Array(times).fill(0);

    iteration.forEach(() => {
      this.click(target);
    });
  },
});
