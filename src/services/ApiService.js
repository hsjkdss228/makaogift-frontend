/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    console.log(`Set accessToken to ${accessToken}`);
    this.accessToken = accessToken;
  }

  async postSession({ identification, password }) {
    const url = `${apiBaseUrl}/session`;
    const { data } = await axios.post(url, {
      identification, password,
    });
    return {
      accessToken: data.accessToken,
      userName: data.name,
      userAmount: data.amount,
    };
  }

  async fetchProduct(id) {
    const url = `${apiBaseUrl}/products/${id}`;
    const { data } = await axios.get(url);
    const product = data;
    return product;
  }

  async fetchProducts(page) {
    const url = `${apiBaseUrl}/products`;
    const { data } = await axios.get(url, {
      params: { page },
    });
    return {
      products: data.products.content,
      pageSize: data.products.pageable.pageSize,
      totalProductsSize: data.totalProductsSize,
    };
  }

  async order({
    productId,
    purchaseCount,
    purchaseCost,
    recipient,
    address,
    messageToSend,
  }) {
    const url = `${apiBaseUrl}/order`;
    const { data } = await axios.post(url, {
      productId,
      purchaseCount,
      purchaseCost,
      recipient,
      address,
      messageToSend,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data.orderId;
  }

  async fetchTransaction(id) {
    const url = `${apiBaseUrl}/orders/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const transaction = data;
    return transaction;
  }

  async fetchTransactions(page) {
    const url = `${apiBaseUrl}/orders`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: { page },
    });

    return {
      transactions: data.transactions,
      pageSize: data.pageSize,
      totalTransactionsSize: data.totalTransactionsSize,
    };
  }
}

export const apiService = new ApiService();
