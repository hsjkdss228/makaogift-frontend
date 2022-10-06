/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class ApiService {
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
    });
    return data.orderId;
  }
}

export const apiService = new ApiService();
