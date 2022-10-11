/* eslint-disable class-methods-use-this */

import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.amount = 0;

    this.loginError = '';

    this.signUpErrors = {};
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
      this.loginError = error.response.data.errorMessage;
      this.publish();
      return '';
    }
  }

  async register({
    name, identification, password, confirmPassword,
  }) {
    try {
      const userName = await apiService.register({
        name, identification, password, confirmPassword,
      });

      return userName;
    } catch (error) {
      this.signUpErrors = error.response.data.codesAndMessages;
      this.publish();
      return '';
    }
  }

  async fetchUserAmount() {
    const amount = await apiService.fetchUserAmount();
    this.amount = amount;
    this.publish();
  }
}

export const userStore = new UserStore();
