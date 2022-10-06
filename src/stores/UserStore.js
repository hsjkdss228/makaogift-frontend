import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.amount = 50000;
  }

  reduceAmount(paidAmount) {
    this.amount -= paidAmount;
    this.publish();
  }
}

export const userStore = new UserStore();
