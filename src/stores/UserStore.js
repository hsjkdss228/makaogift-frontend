import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.amount = 0;
  }

  async login({ identification, password }) {
    try {
      const {
        accessToken, userName, userAmount,
      } = await apiService.postSession({
        identification, password,
      });

      this.name = userName;
      this.amount = userAmount;
      this.publish();

      return accessToken;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  // TODO: amount를 감소시키는 것도 서버와 통신해서 사용자의 잔액을 차감!!!

  reduceAmount(paidAmount) {
    this.amount -= paidAmount;
    this.publish();
  }
}

export const userStore = new UserStore();
