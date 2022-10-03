import { apiService } from '../services/ApiService';

export default class ShopStore {
  constructor() {
    this.products = [];

    this.listeners = new Set();
  }

  async fetchProducts() {
    this.products = await apiService.fetchProducts();
    this.publish();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const shopStore = new ShopStore();
