/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class ApiService {
  async fetchProduct(id) {
    const url = `${apiBaseUrl}/products/${id}`;
    const { data } = await axios.get(url);
    const { product } = data;
    return product;
  }

  async fetchProducts() {
    const url = `${apiBaseUrl}/products`;
    const { data } = await axios.get(url);
    const { products } = data;
    return products;
  }
}

export const apiService = new ApiService();